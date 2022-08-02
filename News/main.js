var newsCompenent ={
  news:[

  ],
 var : currentcountry,
  init:function(){
    this.cacheElements();
    this.fetch();
    this.render();

  },
  cacheElements:function(){
    this.newsTemplate=$("#news-template").html();
    this.$newsGroup=$("#newsGroup");

  },
  fetch (){
    document.addEventListener("click", function (evnt) {
      var country=evnt.target.name;
      eventsMediator.on("country.change", this.currentcountry=country);

      console.log(evnt.target.name);
      $.ajax({
        type:"Get",
        async:false,
        url:"https://newsapi.org/v2/top-headlines?country="+country+"&apiKey=50973495e35d43088d6d05d029db485f",
        cache:false,
        dataType:"json",
        success:function(data){
          newsCompenent.news=data.articles;
          console.log(newsCompenent.news);
          newsCompenent.render();

        }
      })
      
     
    
    });

  },
  render:function(){
    this.$newsGroup.html(Mustache.render(this.newsTemplate,{news :this.news}));

  },
}

var countryComponent = {
  data: [

  ],
  news:[

  ],

  init: function () {
    this.cacheElements();
    this.fetch();
    this.render();
  },

  cacheElements: function () {
    this.$cardGroup = $("#cardGroup");
    this.template = $("#country-template").html();
   
    
  },
  fetch: function () {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://restcountries.com/v3.1/all', true)
    xhr.onload = function () {
      if (this.status === 200) {
        countryComponent.data = JSON.parse(this.responseText);
        countryComponent.render();
        console.log(countryComponent.data);

      }
    }
    xhr.send();
   

  }
  ,
  render: function () {
    this.$cardGroup.html(Mustache.render(this.template, { country: this.data }));
    
  },
 

};

var eventsMediator = {
  events: {},
  on: function (eventName, callbackfn) {
    this.events[eventName] = this.events[eventName]
      ? this.events[eventName]
      : [];
    this.events[eventName].push(callbackfn);
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (callBackfn) {
        callBackfn(data);
      });
    }
  },
};





countryComponent.init();
newsCompenent.init();
