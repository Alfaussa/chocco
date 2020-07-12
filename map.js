ymaps.ready(init);
let myPlacemark;
function init() {
  // Создание карты.
  let myMap = new ymaps.Map("map", {
    center: [55.16082, 61.401933],
    zoom: 11
  });
  myMap.behaviors.disable("scrollZoom");
  myPlacemark1 = new ymaps.Placemark(
    [55.155455, 61.413132],
    {
      hintContent: "Точка продажи №1"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "",
      iconImageSize: [46, 57]
    }
  );
  myPlacemark2 = new ymaps.Placemark(
    [55.160746, 61.448295],
    {
      hintContent: "Точка продажи №2"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "",
      iconImageSize: [46, 57]
    }
  );
  myPlacemark3 = new ymaps.Placemark(
    [55.24896, 61.393678],
    {
      hintContent: "Точка продажи №3"
    },
    {
      iconLayout: "default#image",
      iconImageHref: "",
      iconImageSize: [46, 57]
    }
  );
  myMap.geoObjects.add(myPlacemark1);
  myMap.geoObjects.add(myPlacemark2);
  myMap.geoObjects.add(myPlacemark3);
}