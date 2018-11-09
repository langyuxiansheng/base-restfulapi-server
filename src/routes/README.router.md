
#Request 别名
##如下访问器和别名同 Request 等价:
ctx.header
ctx.headers
ctx.method
ctx.method =
ctx.url
ctx.url =
ctx.originalUrl
ctx.path
ctx.path =
ctx.query
ctx.query =
ctx.querystring
ctx.querystring =
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()
ctx.get()

#Response 别名
##如下访问器和别名同 Response 等价:
ctx.body
ctx.body =
ctx.status
ctx.status =
ctx.message
ctx.message =
ctx.length =
ctx.length
ctx.type =
ctx.type
ctx.headerSent
ctx.redirect()
ctx.attachment()
ctx.set()
ctx.remove()
ctx.lastModified =
ctx.etag =
