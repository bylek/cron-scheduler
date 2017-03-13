FROM haproxy:1.5.18-alpine

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN apk add --no-cache wget

CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]