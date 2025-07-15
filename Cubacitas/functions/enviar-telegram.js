const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const tipo = body.tipo === "admin" ? "admin" : "user";

  // Decide el bot y chat_id según tipo
  let token, chat_id;
  if (tipo === "admin") {
    token = process.env.TELEGRAM_BOT_TOKEN_2;
    chat_id = process.env.TELEGRAM_CHAT_ID_2;
  } else {
    token = process.env.TELEGRAM_BOT_TOKEN_1;
    chat_id = process.env.TELEGRAM_CHAT_ID_1;
  }

  const mensaje = body.mensaje || "Sin mensaje";

  const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id,
      text: mensaje,
      parse_mode: "HTML"
    })
  });

  if (!resp.ok) {
    return { statusCode: 500, body: "Error enviando mensaje a Telegram" };
  }

  return { statusCode: 200, body: "Mensaje enviado correctamente" };
};