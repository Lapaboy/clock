java -jar closure-compiler.jar --js src/script.js --js_output_file build/script.js -W DEFAULT --new_type_inf
sass src/style.scss build/style.css
jsdoc src/script.js