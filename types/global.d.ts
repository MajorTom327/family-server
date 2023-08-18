import { IEnvVars } from "~/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnvVars {}
  }
}

export {};
