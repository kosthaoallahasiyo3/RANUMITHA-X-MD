FROM node:lts-buster
RUN git clone https://github.com/KNIGHT-MD-V1/DARK-KNIGHT-XMD/root/ikJawad
WORKDIR /root/ikJawad
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
