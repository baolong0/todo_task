import Pino from "pino";

export interface Logger {
  debug(message: string, info?: any, err?: Error): void;
  traceD(requestId: string, message: string, info?: any, err?: Error): void;
  info(message: string, info?: any, err?: Error): void;
  traceI(requestId: string, message: string, info?: any, err?: Error): void;
  warn(message: string, info?: any, err?: Error): void;
  traceW(requestId: string, message: string, info?: any, err?: Error): void;
  error(message: string, info?: any, err?: Error): void;
  traceE(requestId: string, message: string, info?: any, err?: Error): void;
  fatal(message: string, info?: any, err?: Error): void;
  traceF(requestId: string, message: string, info?: any, err?: Error): void;
}

export class PinoLogger implements Logger {
  private readonly pinoLogger: Pino.Logger;

  constructor(env: string) {
    this.pinoLogger = Pino({
      level: env === "test" ? "silent" : "info",
    });
  }

  public debug(message: string, info?: any, err?: Error): void {
    this.pinoLogger.debug({ info, err }, message);
  }

  public traceD(requestId: string, message: string, info?: any, err?: Error): void {
    this.pinoLogger.debug({ info, err }, `[${requestId}] ${message}`);
  }

  public info(message: string, info?: any, err?: Error): void {
    this.pinoLogger.info({ info, err }, message);
  }

  public traceI(requestId: string, message: string, info?: any, err?: Error): void {
    this.pinoLogger.info({ info, err }, `[${requestId}] ${message}`);
  }

  public warn(message: string, info?: any, err?: Error): void {
    this.pinoLogger.warn({ info, err }, message);
  }

  public traceW(requestId: string, message: string, info?: any, err?: Error): void {
    this.pinoLogger.warn({ info, err }, `[${requestId}] ${message}`);
  }

  public error(message: string, info?: any, err?: Error): void {
    this.pinoLogger.error({ info, err }, message);
  }

  public traceE(requestId: string, message: string, info?: any, err?: Error): void {
    this.pinoLogger.error({ info, err }, `[${requestId}] ${message}`);
  }

  public fatal(message: string, info?: any, err?: Error): void {
    this.pinoLogger.fatal({ info, err }, message);
  }

  public traceF(requestId: string, message: string, info?: any, err?: Error): void {
    this.pinoLogger.fatal({ info, err }, `[${requestId}] ${message}`);
  }
}
