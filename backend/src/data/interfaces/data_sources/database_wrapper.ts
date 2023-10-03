export interface DatabaseWrapper {
    query(queryString: String, queryConfig?: any[]): Promise<{ rows: any[] }>

}
