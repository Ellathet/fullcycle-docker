FROM golang:1.17-alpine as builder

WORKDIR /usr/src/app
COPY ./src .

RUN CGO_ENABLED=0 go build -o main

FROM scratch

COPY --from=builder /usr/src/app/main /

CMD ["/main"]

