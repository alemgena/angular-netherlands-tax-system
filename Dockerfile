FROM cir.chp.belastingdienst.nl/redhatio/ubi8/nginx-122:latest

EXPOSE 80

USER 0
ADD dist/zaaktypecatalogus-ui /tmp/src/
RUN chown -Rv 1001:0 /tmp/src
USER 1001

# Let the assemble script to install the dependencies
RUN /usr/libexec/s2i/assemble

# Run script uses standard ways to run the application
CMD /usr/libexec/s2i/run
