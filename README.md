**WebComponents with DevExpress, ChartJS & KnockoutJS**

We, at <a href="http://www.advarics.net" target="_blank">advarics GmbH</a>, utilize similar techniques to package and deliver our complex software infrastructure.
We maintain literally hundreds of different Grids, Tables, Tabs, Report-Views, Charts and so on. Therefore, we not only need a stable infrastructure but also a way to
appropriately package and reuse them as often as possible.

**Technologies**

This demo was made with <a href="https://www.devexpress.com/Home/try.xml" target="_blank">DevExpress' DevExtreme</a>, <a href="http://www.chartjs.org/" target="_blank">ChartJS</a> & <a href="http://knockoutjs.com/" target="_blank">KnockoutJS</a>.

It uses KO's facilities to <a href="http://knockoutjs.com/documentation/component-binding.html" target="_blank">register</a> the component.

DevExpress delivers the <a href="http://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxTabs/?version=14_1" target="_blank">Tab-Part</a> while ChartJS generates charts by using HTML's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank">canvas</a>.

**Project requirements**

Please install the trial version of DevExpress' DevExtreme package. Or use the fully licensed version if you have one.
This repository doesn't ship any version of DevExpress. Before building the project, please download either the trial or full version and unpack the JS-scripts
into *scripts/vendor/dx* and the styles into *styles/dx*.

Or, if you like, you can choose any other path but don't forget to adjust the script/style paths in *index.html*.

**Project building**

Default module loader is <a href="https://github.com/webpack/webpack" target="_blank">Webpack</a>. The included *webpack.conf.js* works directly without any adjustment.

To get all needed modules before fuirst build type *npm install*.

After that use *webpack* or *webpack --watch*.

**Running the demo**

This project uses <a href="http://hapijs.com/" target="_blank">HapiJS</a> to boot the demo. Check *index.js* for more information. Routing is done via
<a href="https://www.npmjs.com/package/hapi-router" target="_blank">hapi-router</a>.

*The component supports Pie, Line and Bar Charts*

<img src="http://p26.imgup.net/pie4322.png"/>

<img src="http://f65.imgup.net/line17de.png"/>

<img src="http://k04.imgup.net/bar78f4.png"/>

**Created at**

<a href="http://www.advarics.net" target="_blank">advarics GmbH</a>, Innsbruck (Austria)

Branch Office Bochum (Germany)

**License**

MIT

