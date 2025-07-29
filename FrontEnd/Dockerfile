FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#serve with NGINX
FROM nginx:alpine 

#Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf 

#for custom nginx config
COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]