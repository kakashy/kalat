export type AllIDBKalas = {
	doc?: PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta> | undefined;
	id: PouchDB.Core.DocumentId;
	key: PouchDB.Core.DocumentKey;
	value: {
		rev: PouchDB.Core.RevisionId;
		deleted?: boolean | undefined;
	};
}[];
