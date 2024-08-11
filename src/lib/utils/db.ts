let db: PouchDB.Database;
async function getDb() {
	if (!db) {
		if (typeof window !== 'undefined') {
			const { default: PouchDB } = await import('pouchdb-browser');
			db = new PouchDB('kalat');
		} else {
			throw new Error('PouchDB is not available in this environment.');
		}
	}
	return db;
}

export const saveColor = async (kalat: string) => {
	try {
		const db = await getDb();
		// checking to see if it already exists
		const existingDoc = await db.get(kalat);
		if (existingDoc._id) {
			return {
				ok: false,
				status: 409,
				message: 'This color already exists.'
			};
		} else {
			const { ok } = await db.put({
				_id: kalat
			});
			return { ok, status: 200, message: 'Color successfully added.' };
		}
	} catch (putError) {
		const e = putError as PouchDB.Core.Error;
		if (e.status == 404) {
			// document is missing so lets add it.
			const { ok } = await db.put({
				_id: kalat
			});
			return { ok, status: 200, message: 'Color successfully added.' };
		}
		return {
			ok: false,
			status: 500,
			message: e.message as string
		};
	}
};

export const deleteColor = async (kalat: string) => {
	try {
		const db = await getDb();
		const doc = await db.get(kalat);
		const { ok } = await db.remove(doc);
		return { ok, status: 200, message: 'Color successfully removed.' };
	} catch (e) {
		return { ok: false, status: 500, message: e.message as string };
	}
};

export const fetchKalas = async () => {
	try {
		const db = await getDb();
		const { rows } = await db.allDocs({ include_docs: true });
		return {
			docs: rows
		};
	} catch (error) {
		return {
			docs: []
		};
	}
};
