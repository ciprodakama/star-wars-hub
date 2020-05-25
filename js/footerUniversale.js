/*  Abbiamo usato VueJS universalizzare il footer. Differisce da quell'altro perché i file PHP
    si trovano in un'altra cartella rispetto agli html e quindi hanno i link per raggiungere altre pagine diversi
*/
Vue.component('endsito', {
    template: `
            <div>
                <footer class="footer">
                    <div class="container">
                        <span style="color:#ecd310; font-size: 16px">StarWarsHub, Copyright &copy; 2020</span>
                        <a href="aboutUs.html" class="AboutUs" style="color:#ecd310; float:right; text-decoration: underline;">About us</a>
                    </div>
                </footer>
            </div>`,
});

var app = new Vue({
    el: '#footeruniv',
});