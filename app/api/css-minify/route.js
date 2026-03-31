import CleanCSS from "clean-css";

export async function POST(request) {
  try {
    const body = await request.json();
    const css = typeof body.css === "string" ? body.css : "";

    if (!css.trim()) {
      return new Response(
        JSON.stringify({ css: "", error: "Empty CSS payload." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const result = new CleanCSS().minify(css);
    if (result.errors && result.errors.length) {
      return new Response(
        JSON.stringify({ css: "", error: result.errors.join("\n") }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ css: result.styles || "" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ css: "", error: err.message || "Unexpected error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}


