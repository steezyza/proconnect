/proconnect-backend
  /src
    /api
      /auth
        auth.controller.ts
        auth.routes.ts
        auth.service.ts
        auth.validation.ts
      /courses
        courses.controller.ts
        courses.routes.ts
        courses.service.ts
      /mentorship
        ...
      /forum
        ...
      /gamification
        ...
      /newsletter
        ...
    /config
      index.ts         // For environment variables
      passport.ts      // For OAuth strategies
    /middlewares
      auth.middleware.ts // To protect routes
      error.middleware.ts  // Global error handler
    /models
      user.model.ts
      course.model.ts
      // ... other models
    /utils
      ApiError.ts
      catchAsync.ts
    app.ts             // Express app configuration
    server.ts          // Server entry point
  /tests
    /integration
    /unit
  .env
  .gitignore
  jest.config.js
  package.json
  tsconfig.json
