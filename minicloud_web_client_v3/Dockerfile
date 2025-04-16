FROM node:14-alpine as builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:alpine as production-build
COPY --from=builder /app/dist /usr/share/nginx/html
    
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]