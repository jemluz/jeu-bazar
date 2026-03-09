import { NextRequest, NextResponse } from "next/server"

/**
 * Protege a rota /controle com HTTP Basic Auth.
 *
 * Fluxo:
 * 1. Intercepta requisições para /controle (definido em `matcher`).
 * 2. Lê o header Authorization da requisição.
 * 3. Se estiver em formato Basic, decodifica `usuario:senha` e usa apenas a senha.
 * 4. Compara a senha enviada com `CONTROLE_PASSWORD`.
 * 5. Se bater, libera a requisição com `NextResponse.next()`.
 * 6. Se não bater, retorna 401 com `WWW-Authenticate` para abrir o prompt de login.
 * 7. Se `CONTROLE_PASSWORD` não estiver configurada, retorna 500.
 */

function getBasicAuthPassword(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Basic ")) {
    return null
  }

  const encodedCredentials = authorization.split(" ")[1]

  if (!encodedCredentials) {
    return null
  }

  try {
    const decodedCredentials = atob(encodedCredentials)
    const [, password = ""] = decodedCredentials.split(":")
    return password
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const expectedPassword = process.env.CONTROLE_PASSWORD

  if (!expectedPassword) {
    return new NextResponse("CONTROLE_PASSWORD não configurado", { status: 500 })
  }

  const password = getBasicAuthPassword(request)

  if (password === expectedPassword) {
    return NextResponse.next()
  }

  return new NextResponse("Autenticação necessária", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Controle", charset="UTF-8"',
    },
  })
}

export const config = {
  // Intercepta qualquer rota iniciada com /controle
  matcher: ["/controle/:path*"],
}
