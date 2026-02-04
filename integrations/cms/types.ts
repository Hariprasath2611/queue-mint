export type WixDataItem = {
    [key: string]: any;
    _id?: string;
    _createdDate?: string | Date;
    _updatedDate?: string | Date;
    _owner?: string;
};

export type WixDataQueryResult = {
    items: WixDataItem[];
    length: number;
    totalCount: number;
    query?: any;
};
