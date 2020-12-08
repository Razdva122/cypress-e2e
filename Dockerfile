FROM cypress/included:4.6.0

RUN npm install typescript cypress @types/node @types/cypress-image-snapshot cypress-image-snapshot ts-node
