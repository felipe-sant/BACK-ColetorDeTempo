class DatabaseService {
    create(body: any, query: any) {
        return {
            message: "Criar de base de dados",
            query: query,
            body: body
        };
    }

    list() {
        return {
            message: "Listar de base de dados",
        };
    }
}

export default DatabaseService;