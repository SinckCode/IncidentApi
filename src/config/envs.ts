import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_EMAIL:env.get("MAILER_EMAIL").required().asString(),
    MAPBOX_TOKEN:env.get("MAPBOX_TOKEN").required().asString(),
    MAILER_PASSWORD:env.get("MAILER_PASSWORD").required().asString(),
    MAILER_SERVICE:env.get("MAILER_SERVICE").required().asString()
}
