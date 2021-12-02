FROM python:alpine3.14
RUN apk add npm
RUN mkdir /app
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app
RUN apk add git
RUN git clean -dfx
RUN npm install -g npm
RUN npm i
RUN npx webpack
EXPOSE 5001
ENTRYPOINT [ "python" ]
CMD [ "routes.py" ]
