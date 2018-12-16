(() => {
    //const cars = document.querySelectorAll('.data-ref');

    const vm = new Vue({
        el : "#app",

        data : {
            modelname : "",
            modelpricing : "",
            modeldetails : "",

            videosrc : [
                "mini_1.mp4",
                "mini_2.mp4",
                "mini_3.mp4"
            ],

            
            vidThumbs : [
               {src : 'vid1.jpg',number : 0},
               {src : 'vid2.jpg',number : 1},
               {src : 'vid3.jpg',number : 2}
            ]

            

            
        },

        mounted : function() {
            // Listen for when Vue is done vuilding itself
            // console.log('mounted');

            this.addPreloader(document.querySelector('.modelInfo'));

            // get the data of the first car
            document.querySelector('#F55').click();

            
        },

        updated : function(){
            // Listen for when Vuje completes its updates / render cycle
            // console.log('updated');

            let preloader = document.querySelector('.preloader-wrapper');

            setTimeout(function() {
                preloader.classList.add('hidden');
                // document.body.appendChild('preloader');

            }, 1000)
        },

        methods: {
            volOn(e) {
                // catch the volon event
                // console.log('moused over the video');

                // unmute the video 
                e.currentTarget.muted = false;
            },

            volOff(e) {
                // catch the mousenout event
                // console.log('mosued off the video');

                e.currentTarget.muted = true;
            },

            vidSwap(number){

                var video = document.querySelector('video');
                video.src = "video/"+this.videosrc[number];
                // e.currentTarget[0] = videosrc[0];
                console.log(number);
                // videosrc[0];
                console.log(this.videosrc[number]);
                
            },

            addPreloader(parentEl) {
                parentEl.appendChild(document.querySelector('.preloader-wrapper'));
                // set up the preloader animation
                bodymovin.loadAnimation({
                    wrapper : document.querySelector('.preloader'),
                    animType : 'svg',
                    loop : true,
                    path : './data/bike_loading_animation.json'

                });
            },

            fetchData(e) {
                //debugger;
                let targetURL = e.currentTarget.id;

                fetch(`./includes/connect.php?modelNo=${targetURL}`) // go get the data and bring it back! good doggy
                .then(res => res.json()) // turn the result into a plain JS object
                .then(data => {
                    // console.log(data);
                    // run a function to parse our data
                    const { modelName, pricing, modelDetails } = data[0];
                    this.modelname = modelName;
                    this.modeldetails = modelDetails;
                    this.modelpricing =  pricing;
                })
                .catch(function(error) {
                    console.log(error); // if anything broke, log it to the console
                });
            },

        }
    });


    //cars.forEach(car => car.addEventListener("click", getData));
})();