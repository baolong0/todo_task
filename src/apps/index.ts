/* tslint:disable:ordered-imports */
import { Server } from "Apps/server";
import AppContainer from "Injection/appContainer";

const appContainer = AppContainer.getInstance();
appContainer.inject();
const server = new Server(appContainer);

server.start();
