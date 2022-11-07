
import qr from "qrcode";

export async function onRequestPost(context) {
  // Contents of context object
  // const {
  //   request, // same as existing Worker API
  //   env, // same as existing Worker API
  //   params, // if filename includes [id] or [[path]]
  //   waitUntil, // same as ctx.waitUntil in existing Worker API
  //   passThroughOnException, // same as ctx.passThroughOnException in existing Worker API
  //   next, // used for middleware or to fetch assets
  //   data, // arbitrary space for passing data between middlewares
  // } = context;

  const { request } = context;
  const { url } = await request.json();

  const qrImage = await qr.toString(url, {
    type: 'svg', color: {
      light: '#3685FF',
      dark: '#fff'
    }
  });

  return new Response(JSON.stringify({ svg: qrImage }), {
    headers: {
      'Content-Type': 'application/json',
    }
  }); // Web API
}
