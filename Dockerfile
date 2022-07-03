FROM node:12 as builder
WORKDIR /opt/app
COPY package.json /opt/app
RUN npm install
COPY . /opt/app
EXPOSE 8096
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /opt/app/dist/event-frontend .
#COPY nginx.conf /etc/nginx/nginx.conf
copy nginx.conf /etc/nginx/conf.d/default.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]



