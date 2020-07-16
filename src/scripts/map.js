ymaps.ready(init);
let myPlacemark;
function init() {
  // Создание карты.
  let myMap = new ymaps.Map("map", {
    center: [55.754404, 37.607665],
    zoom: 13,
    controls:[]
  });
  myMap.behaviors.disable("scrollZoom");
  myPlacemark1 = new ymaps.Placemark(
    [55.784693, 37.640796],
    {
      hintContent: "Точка продажи №1"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "../images/mark.png",
      iconImageSize: [46, 57]
    }
  );
  myPlacemark2 = new ymaps.Placemark(
    [55.747641, 37.604576],
    {
      hintContent: "Точка продажи №2"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "../images/mark.png",
      iconImageSize: [46, 57]
    }
  );
  myPlacemark3 = new ymaps.Placemark(
    [55.762324, 37.634273],
    {
      hintContent: "Точка продажи №3"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "../images/mark.png",
      iconImageSize: [46, 57]
    }
  );
  myPlacemark4 = new ymaps.Placemark(
    [55.732324, 37.594273],
    {
      hintContent: "Точка продажи №4"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "../images/mark.png",
      iconImageSize: [46, 57]
    }
  );
  myMap.geoObjects.add(myPlacemark1);
  myMap.geoObjects.add(myPlacemark2);
  myMap.geoObjects.add(myPlacemark3);
  myMap.geoObjects.add(myPlacemark4);
}