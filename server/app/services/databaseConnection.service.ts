import { injectable } from "inversify";
import "reflect-metadata";
import { Constants } from "../../../common/constants";

// tslint:disable-next-line: variable-name no-any
const Sequelize: any = require("sequelize");

@injectable()
export class DatabaseConnectionService {

    // tslint:disable-next-line:no-any
    public connection: any;

    public constructor() {
        this.connection = new Sequelize("postgres", "postgres", Constants.DATABASE_PASSWORD, {
            host:       Constants.DATABASE_SERVER_URL,
            port:       Constants.DATABASE_SERVER_PORT,
            dialect:    "postgres",
            schema:     Constants.DATABASE_SCHEMA,
        });

        this.authentification();
    }

    public authentification(): void {
        this.connection.authenticate()
        .then(() => {
            console.log("La connection est authentifiée");
        })
        .catch((err: Error) => {
            console.error("La connection n'a pas fonctionnée.");
            console.error(err.message);
        });

    }
}
