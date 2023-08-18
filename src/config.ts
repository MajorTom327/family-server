import zod from "zod";

export const envSchema = zod.object({
  NODE_ENV: zod.union([zod.literal("development"), zod.literal("production")]),
  PORT: zod.coerce.number().optional(),
});

export type IEnvVars = zod.infer<typeof envSchema>;

export const getEnv = (key: keyof IEnvVars, defaultValue: any = undefined) => {
  const env = envSchema.parse(process.env);

  const value = env[key];
  return value || defaultValue;
};
