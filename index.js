// Import stylesheets
import './style.css';
import $ from 'jquery';
import { Map, TileLayer, LayerGroup, Control, Icon } from 'leaflet';
import 'leaflet-groupedlayercontrol';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';
// Write Javascript code!
const map = new Map('map');
const amapLayer = new TileLayer(
  'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  {
    subdomains: '1234',
  }
);
document.getElementById('fileSubmit').addEventListener('change', function () {
  readFile(
    this,
    function (data) {
      console.log(data);
      var addressPoint = $.parseJSON(data);
      // let userData=[];
      var all_markers = [];
      var markers = [];
      var Cases = [];
      var alldata = new L.LayerGroup();
      for (var i = 0; i < addressPoint.length; i++) {
        markers[i] = [];
        Cases[i] = L.layerGroup();
        for (var j = 0; j < addressPoint[i].length; j++) {
          var a = addressPoint[i][j];
          // userData.push('{id:${i},p:${a}}')
          var title = a[2];
          var marker = L.marker(new L.LatLng(a[0], a[1]), {
            icon: new Icon({
              iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
              iconSize: [32, 20],
              iconAnchor: [16, 20],
            }),
            title: title,
          });
          //  marker.bindPopup(title).addTo(map);
          marker.bindPopup(title).addTo(Cases[i]);
          markers[i].push(marker);
          //marker.addTo(map);
          all_markers.push(marker); //所有的marker
        }

        var markers_layer = [];
        markers_layer[i] = L.featureGroup(markers[i]);

        var polyline = [];
        polyline[i] = L.polyline(addressPoint[i]).addTo(Cases[i]);
        var allpolyline = L.polyline(addressPoint[i]).addTo(alldata);
        var all_layer = L.featureGroup(all_markers);
        all_layer.addTo(alldata);
        map.fitBounds(all_layer.getBounds());

        // var overlays = {
        //   alldata: alldata
        //   // "病例":Cases[i]
        // };
        // overlays[i+1]=Cases[i];
        // var overlays={}
        // overlays[i+1]=Cases[i];
        // var groupedOverlays = {
        //   "所有病例": {
        //     "alldata": alldata
        //   },
        //   "病例": {
        //     overlays: Cases[i]
        //   }
        // };
        // L.control.groupedLayers(null, groupedOverlays).addTo(map);
        // var slayers=L.control.layers(null,overlays, {
        //      position: 'topleft',
        //      collapsed: true
        //    }).addTo(map);
      }
      var overlays = {
        // alldata: alldata
      };
      overlays[0] = alldata;
      for (var i = 0; i < Cases.length; i++) {
        overlays[i + 1] = Cases[i];
      }
      var slayers = L.control
        .layers(null, overlays, {
          position: 'topleft',
          collapsed: true,
        })
        .addTo(map);
      // var layers=[];
      // for(var n=0;n<markers.length;n++){
      //   layers[i] = L.featureGroup(markers[i]).addTo(map);

      // }

      // for (var i = 0; i < Cases.length; i++)
      // {
      //     overlays[i+1] = Cases[i];
      // }

      //  L.control.layers({},all_markers, {
      //    position: 'topleft',
      //    collapsed: false
      //  }).addTo(map);
    },
    function () {
      alert('解析文件出错');
    }
  );
});
function readFile(input, sc, ec) {
  //支持chrome IE10
  if (window.FileReader) {
    var file = input.files[0];
    var filename = file.name.split('.')[0];
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = function () {
      sc(this.result); //这里的 this 指向 FileReader
    };
  }
  //支持IE 7 8 9 10
  else if (typeof window.ActiveXObject != 'undefined') {
    var xmlDoc;
    xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = false;
    xmlDoc.load(input.value);
    sc(xmlDoc);
  }
  //支持FF
  else if (document.implementation && document.implementation.createDocument) {
    var xmlDoc;
    xmlDoc = document.implementation.createDocument('', '', null);
    xmlDoc.async = false;
    xmlDoc.load(input.value);
    sc(xmlDoc);
  } else {
    ec();
  }
}
/*var addressPoint =[[[24.903606,118.590975],[24.88842,118.608761]],[[24.887942,118.609526],[24.900594,118.601456],[24.887368,118.596548],[24.931552,118.667482]],[[24.888495,118.601803],[24.958855,118.402473],[24.887942,118.609526],[24.888702,118.608335],[24.886853,118.606871],[24.890398,118.60835],[24.889511,118.60836]],[[24.8875466,118.609685],[24.885623,118.609947],[24.888495,118.601803],[24.897708,118.591239],[24.811663,118.591743],[24.777467,118.565486],[24.85521,118.578659],[24.9018,118.623464],[24.896375,118.58761],[24.88907,118.600609]],[[24.887942,118.609526],[24.903782,118.589931],[24.891454,118.59642],[24.890767,118.609871]],[[24.887942,118.609526],[24.887601,118.608988],[24.887487,118.603673],[24.890356,118.609626],[24.888084,118.607853]],[[24.887942,118.609526],[24.874615,118.635],[24.890242,118.602321],[24.886145,118.6089]],[[24.887942,118.609526],[24.888723,118.607911],[24.885719,118.610285],[24.887487,118.603673],[24.890356,118.609626],[24.881967,118.601856],[24.902533,118.613735],[24.92055,118.657743]]
,[[24.861465,118.592873],[24.887942,118.609526],[24.90424,118.603167],[24.883518,118.600204]],[[24.888836,118.602345],[24.887141,118.600451],[24.901008,118.614878],[24.88903,118.603973],[24.882021,118.592867],[24.88192,118.601801],[24.885615,118.601867],[24.890327,118.606211],[24.90424,118.603167],[24.912402,118.597828]]];*/
const svg =
  '<svg t="1621166776642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1407" width="200" height="200"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#FF3D00" p-id="1408"></path></svg>';
/*
for (var i=0; i<addressPoint.length; i++){
  for (var j =0;j<addressPoint[i].length;j++){
    var a=addressPoint[i][j];
    var marker=L.marker(new L.LatLng(a[0],a[1]),{
      icon: new Icon({
        iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
        iconSize: [28,20],
        iconAnchor: [14,20]
    })
  });
  marker.addTo(map);
 } 
}
L.polyline(addressPoint).addTo(map)
*/
amapLayer.addTo(map);

map.setView([24.887942, 118.609526], 11);
