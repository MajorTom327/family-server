import zod from "zod";

export const envSchema = zod.object({
  NODE_ENV: zod.enum(["development", "production", "test"]),
  PORT: zod.coerce.number().default(3000),
});

export type IEnvVars = zod.infer<typeof envSchema>;

export const getEnv = (key: keyof IEnvVars, defaultValue: any = undefined) => {
  const env = envSchema.parse(process.env);

  console.log("env", env);

  const value = env[key];
  return value || defaultValue;
};
