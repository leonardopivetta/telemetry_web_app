FROM grafana/grafana-oss:8.2.6


# SETTING THE PASSWORD AS IN THE FILE /secrets/admin_password
WORKDIR /run/
COPY ./secrets/ ./secrets/
ENV GF_SECURITY_ADMIN_PASSWORD__FILE=/run/secrets/admin_password

# # ENABLING ANONYMOUS VIEWING
# ENV GF_AUTH_ANONYMOUS_ENABLED=true
# ENV GF_AUTH_ANONYMOUS_ORG_NAME=eagle-trt
# ENV GF_AUTH_ANONYMOUS_ORG_RULE=Viewer

# # ALLOW EMBEDDING
# ENV GF_SECURITY_ALLOW_EMBEDDING=true

WORKDIR /usr/share/grafana/conf/
COPY ./config.ini ./grafana.ini 

EXPOSE 3000