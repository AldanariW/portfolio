# Build:

1. Clone the project:
    ````shell
      git clone https://github.com/AldanariW/portfolio.git
    ````
2. Go to project root:
    ````shell
   cd portfolio
   ````
3. Install npm dependencies:
    ````shell
   npm install --save-dev
   ````
4. [*Optional*] Change the build mode from ``production`` to ``developement`` in ``./docs/webpack.config.js`` for easier debugging
   ```js
   module.exports = {
   // ...
   mode: "production" // => mode: "developpement"
   }
   ```

5. Build the project (essentially compile the TypeScript files)
   ````shell
   npm run build
   ````
   
6. Expose the ``index.html`` file with you're prefered web server
   ````shell
   # Example with npx@http-server
   cd docs
   npx -y http-server
   ````
7. Go to ``localhost`` and enjoy :)


# Roadmap

- [x] Implement real parsing
- [x] Help option for all commands with additional arguments (to write)
- [ ] Syntax Error highlight in Command Parser
- [ ] Table content rendering
- [ ] Icons
- [ ] Autocompletion