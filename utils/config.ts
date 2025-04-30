import { exists, toml } from "../deps.ts";

export interface Configs {
  port: number;
  mode: string;
  host: string;
  token: string;
}

export class Config {
  private path: string;
  private host: string;
  private port: number;
  private mode: string;
  private token: string;

  constructor(path: string) {
    this.mode = "polling";
    this.token = "";
    this.host = "127.0.0.1";
    this.port = 8000;
    this.path = path;
  }

  async consume(): Promise<void> {
    if (!(await exists(this.path))) {
      console.log("Does even your config file exists?");
      Deno.exit(1);
    }

    const read = Deno.readTextFileSync(this.path);
    const data = toml.parse(read);

    this.port = data.port as number;
    this.mode = data.mode as string;
    this.host = data.host as string;
    this.token = data.token as string;
  }

  data(): Configs {
    return {
      host: this.host,
      port: this.port,
      mode: this.mode,
      token: this.token,
    };
  }
}

export default Config;
