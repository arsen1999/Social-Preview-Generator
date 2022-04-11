const maxlength = 60; //maximum length title
const minlength = 30; //minimum length title
const maxWidthImg = 1205;
const minWidthImg = 1195;
const maxHeightImg = 635;
const minHeightImg = 625;

let mediaInfo;

const myIcons = [
    {
        icon: "icon ph-facebook-logo active",
        functionName: `this.nextFacebook(mediaInfo)`
    },
    {
        icon: "icon ph-twitter-logo",
        functionName: `this.nextTwitter(mediaInfo)`
    },
    {
        icon: "icon ph-linkedin-logo",
        functionName: `this.nextLinkedin(mediaInfo)`
    },
    {
        icon: "icon ph-slack-logo",
        functionName: `this.nextSlack(mediaInfo)`

    },
];

class SocialPreviewGenerator {

    constructor() {
    }

    getSocialData() {

        this.resetTemplate();
        this.creatLoadingElement();

        const buttonElement = document.querySelector('button');
        const initMsgElement = document.querySelector(".init-message");
        const loadingElement = document.querySelector(".loading-container");
        const errorMsgElement = document.querySelector(".error-msg");

        buttonElement.disabled = true;
        buttonElement.classList.add("button--loading");

        errorMsgElement?.remove();
        initMsgElement?.remove();

        const urlVal = document.querySelector('input[type="url"]').value;

        fetch(`https://fetch-meta-tags.glitch.me/?url=${urlVal}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                mediaInfo = data;
                console.log(data.metas);
                loadingElement.remove();
                buttonElement.disabled = false;
                buttonElement.classList.remove("button--loading");

                if (data.metas.length === 0) {
                    this.crateErrorContainer(urlVal);
                } else {
                    this.creatSocialIconElements();
                    this.creatFacebookContainer();
                    this.viewFacebook(data);
                    this.creatInfoContainer();
                    this.globalInfo(data);
                }

            });
    }

    resetTemplate() {
        document.querySelector('.social-icon')?.remove();
        document.querySelector('.facebook-data')?.remove();
        document.querySelector('.twitter-data')?.remove();
        document.querySelector('.linkedin-data')?.remove();
        document.querySelector('.slack-data')?.remove();
        document.querySelector('.data-info')?.remove();
    }

    resetSocialInfo() {
        document.querySelector('.facebook-data')?.remove();
        document.querySelector('.twitter-data')?.remove();
        document.querySelector('.linkedin-data')?.remove();
        document.querySelector('.slack-data')?.remove();
    }

    creatLoadingElement() {
        const loadingContainerDiv = document.createElement('div');
        loadingContainerDiv.className = 'loading-container';
        const span = document.createElement("span");
        span.className = 'processing-msg';
        span.innerText = 'Processing..'
        loadingContainerDiv.appendChild(span);
        const spinnerDiv = document.createElement('div');
        spinnerDiv.className = 'spinner';
        loadingContainerDiv.appendChild(spinnerDiv);
        const loadCircle1 = document.createElement('div');
        loadCircle1.className = 'load-circle load-circle-1'
        const loadCircle2 = document.createElement('div');
        loadCircle2.className = 'load-circle load-circle-2'
        const loadCircle3 = document.createElement('div');
        loadCircle3.className = 'load-circle load-circle-3'
        spinnerDiv.appendChild(loadCircle1);
        spinnerDiv.appendChild(loadCircle2);
        spinnerDiv.appendChild(loadCircle3);
        document.querySelector(".preview-container").prepend(loadingContainerDiv);
    }

    creatSocialIconElements() {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'social-icon'
        myIcons.forEach((item) => {
            iconDiv.innerHTML += `<i class="${item.icon}"></i>`
            document.querySelector('.content').prepend(iconDiv);
        });
        document.querySelector(`.ph-twitter-logo`).addEventListener('click', () => {
            this.nextTwitter(mediaInfo);
        })
        document.querySelector(`.ph-facebook-logo`).addEventListener('click', () => {
            this.nextFacebook(mediaInfo);
        })
        document.querySelector(`.ph-linkedin-logo`).addEventListener('click', () => {
            this.nextLinkedin(mediaInfo);
        })
        document.querySelector(`.ph-slack-logo`).addEventListener('click', () => {
            this.nextSlack(mediaInfo);
        })

        this.iconsAddActiveClassName();
    }

    iconsAddActiveClassName() {
        const icons = document.querySelectorAll(".icon");

        icons.forEach((item) => {
            item.addEventListener("click", function () {
                const current = document.querySelectorAll(".active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        })
    }

    creatFacebookContainer() {
        const facebookDataDiv = document.createElement('div');
        facebookDataDiv.className = 'facebook-data';
        const imgDiv = document.createElement('div');
        imgDiv.className = 'img-container';
        imgDiv.innerHTML = `<div class="img"></div>`;
        facebookDataDiv.appendChild(imgDiv);
        const textDiv = document.createElement('div');
        textDiv.className = 'text-container';
        textDiv.innerHTML = `<span class="domain"></span><span class="header"></span><span class="description"></span>`;
        facebookDataDiv.appendChild(textDiv);
        document.querySelector(".preview-container").prepend(facebookDataDiv);
        return facebookDataDiv;
    }

    creatTwitterContainer() {
        const twitterDataDiv = document.createElement('div');
        twitterDataDiv.className = 'twitter-data';
        const imgDiv = document.createElement('div');
        imgDiv.className = 'img-container';
        imgDiv.innerHTML = `<div class="twitter-image"></div>`;
        twitterDataDiv.appendChild(imgDiv);
        const textDiv = document.createElement('div');
        textDiv.className = 'twitter-content';
        textDiv.innerHTML =
            `<span class="twitter-title"></span>
    <span class="twitter-description"></span>
    <div class="twitter-link-block">
        <i class="ph-link"></i>
        <span class="twitter-link"></span>
    </div>`;
        twitterDataDiv.appendChild(textDiv);
        document.querySelector(".preview-container").prepend(twitterDataDiv);
    }

    creatLinkedinContainer() {
        const linkedinDataDiv = document.createElement('div');
        linkedinDataDiv.className = 'linkedin-data';
        const imgDiv = document.createElement('div');
        imgDiv.className = 'img-container';
        imgDiv.innerHTML = `<div class="linkedin-image"></div>`;
        linkedinDataDiv.appendChild(imgDiv);
        const textDiv = document.createElement('div');
        textDiv.className = 'linkedin-content';
        textDiv.innerHTML =
            `<span class="linkedin-title"></span>
    <div class="linkedin-link-block">
        <span class="linkedin-link"></span>
    </div>`;
        linkedinDataDiv.appendChild(textDiv);
        document.querySelector(".preview-container").prepend(linkedinDataDiv);
    }

    creatSlackContainer() {
        const slackDataDiv = document.createElement('div');
        slackDataDiv.className = 'slack-data';
        const slackDataContainerDiv = document.createElement('div');
        slackDataContainerDiv.className = 'slack-data-container';
        slackDataContainerDiv.innerHTML =
            `<div class="slack-line"></div>
  <div>
      <div class="slack-content">
          <div class="slack-link-block">
              <img src="" alt="" class="slack-image-link">
              <span class="slack-link"></span>
          </div>
          <span class="slack-title"></span>
          <span class="slack-description"></span>

      </div>
      <div class="img-container">
          <div class="slack-image"></div>

      </div>
  </div>`;
        slackDataDiv.appendChild(slackDataContainerDiv);
        return document.querySelector(".preview-container").prepend(slackDataDiv);
    }

    crateErrorContainer(urlVal) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.innerHTML =
            `<div class="error-title">
                 <i class="ph-warning"></i> The URL contains an invalid path
             </div>
             <span class="error-url"></span>`;

        document.querySelector(".preview-container").appendChild(errorDiv);
        const errorMsgUrlElement = document.querySelector(".error-url");
        errorMsgUrlElement.innerText = urlVal;
    }

    creatInfoContainer() {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'data-info';
        infoDiv.innerHTML =
            `
                        <div class="result">
                            <div class="result-icon twitter-title-icon"></div>

                            <div class="result-info">
                                <div class="result-title">
                                    <h3>Title</h3>
                                </div>
                                <div class="result-text">
                                    <ul>
                                        <li class="title-info">
                                        </li>
                                        <li class="title-length-info">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="result">

                            <div class="result-icon icon-description"></div>

                            <div class="result-info">
                                <div class="result-title">
                                    <h3>Description</h3>
                                </div>
                                <div class="result-text">
                                    <ul>
                                        <li class="description-info">
                                        </li>
                                        <li class="description-length-info">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="result">
                            <div class="result-icon icon-image">
                            </div>
                            <div class="result-info">
                                <div class="result-title">
                                    <h3>Image</h3>
                                </div>
                                <div class="result-text">
                                    <ul>
                                        <li class="image-info">
                                        </li>
                                        <li class="img-size-info">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
            `
        document.querySelector(".preview-container").appendChild(infoDiv);
    }

    nextTwitter(socialInfo) {
        this.resetSocialInfo();
        this.creatTwitterContainer();
        document.querySelector('.card')?.remove();
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result card';
        resultDiv.innerHTML = `
        <div class="result-icon icon-card"></div>
          <div class="result-info">
              <div class="result-title">
                 <h3>Card</h3>
              </div>
       <div class="result-text">
           <ul>
             <li class="card-info">
              </li>
          </ul>
        </div>
      </div>
       `
        const dataInfo = document.querySelector('.data-info');
        dataInfo.prepend(resultDiv);

        this.viewTwitter(socialInfo);
        this.twitterInfo(socialInfo);

    }

    nextFacebook(socialInfo) {
        this.resetSocialInfo();
        this.creatFacebookContainer();
        this.viewFacebook(socialInfo);
        this.globalInfo(socialInfo);
        document.querySelector('.card')?.remove();
    }

    nextLinkedin(socialInfo) {
        this.resetSocialInfo();
        this.creatLinkedinContainer();
        this.viewLinkedin(socialInfo);
        this.globalInfo(socialInfo);
        document.querySelector('.card')?.remove();
    }

    nextSlack(socialInfo) {
        this.resetSocialInfo();
        this.creatSlackContainer();
        this.viewSlack(socialInfo);
        this.globalInfo(socialInfo);
        document.querySelector('.card')?.remove();
    }

    viewFacebook(socialInfo) {
        socialInfo.metas.forEach(item => {

            switch (item.key) {

                case 'og:image':
                    if (item.value.startsWith('https://')) {
                        document.querySelector(".img").style.backgroundImage = `url(${item.value})`;
                    } else {
                        document.querySelector(".img").style.backgroundImage = `url(assets/images/smiley-x-eyes.jpg)`;
                    }
                    break;
                case 'title':
                    document.querySelector(".header").innerHTML = item.value;
                    break;
                case 'canonical':
                    document.querySelector(".domain").innerHTML = item.value.substr(8).replace(/[^a-zа-яё0-9\s.]/gi, ' ');
                    break;
                case 'description':
                    document.querySelector(".description").innerHTML = item.content;
                    break;
            }
        });
    }

    viewTwitter(socialInfo) {
        socialInfo.metas.forEach(item => {

            switch (item.key) {

                case 'og:image':
                    if (item.value.startsWith('https://')) {
                        document.querySelector(".twitter-image").style.backgroundImage = `url(${item.value})`;
                    } else {
                        document.querySelector(".twitter-image").style.backgroundImage = `url(assets/images/smiley-x-eyes.jpg)`;
                    }
                    break;
                case 'title':
                    document.querySelector(".twitter-title").innerHTML = item.value;
                    break;
                case 'canonical':
                    document.querySelector(".twitter-link").innerHTML = item.value.substr(8).replace(/[^a-zа-яё0-9\s.]/gi, ' ');
                    break;
                case 'description':
                    document.querySelector(".twitter-description").innerHTML = item.content;
                    break;
            }
        });
    }

    viewLinkedin(socialInfo) {
        socialInfo.metas.forEach(item => {

            switch (item.key) {

                case 'og:image':
                    if (item.value.startsWith('https://')) {
                        document.querySelector(".linkedin-image").style.backgroundImage = `url(${item.value})`;
                    } else {
                        document.querySelector(".linkedin-image").style.backgroundImage = `url(assets/images/smiley-x-eyes.jpg)`;
                    }
                    break;
                case 'title':
                    document.querySelector(".linkedin-title").innerHTML = item.value;
                    break;
                case 'canonical':
                    document.querySelector(".linkedin-link").innerHTML = item.value.substr(8).replace(/[^a-zа-яё0-9\s.]/gi, ' ');

                    break;
            }
        });
    }

    viewSlack(socialInfo) {
        socialInfo.metas.forEach(item => {

            switch (item.key) {

                case 'og:image':
                    if (item.value.startsWith('https://')) {
                        document.querySelector(".slack-image").style.backgroundImage = `url(${item.value})`;
                        document.querySelector(".slack-image-link").src = item.value;
                    } else {
                        document.querySelector(".slack-image").style.backgroundImage = `url(assets/images/smiley-x-eyes.jpg)`;
                        document.querySelector(".slack-image-link").src = `assets/images/smiley-x-eyes.jpg`;
                    }
                    break;
                case 'title':
                    document.querySelector(".slack-title").innerHTML = item.value;
                    break;
                case 'canonical':
                    document.querySelector(".slack-link").innerHTML = item.value.substr(8).replace(/[^a-zа-яё0-9\s.]/gi, ' ');
                    break;
                case 'description':
                    document.querySelector(".slack-description").innerHTML = item.content;
                    break;
            }
        });
    }

    globalInfo(data) {
        // title info Validation start
        const newArrayTitle = data.metas.filter((newarr) => newarr.key === 'og:title' | newarr.key === 'title');
        console.log(newArrayTitle);

        for (let i = 0; i < newArrayTitle.length; i++) {
            if (newArrayTitle[i].key === 'og:title') {
                this.ogTitleValidation(newArrayTitle[i]);
                break;
            } else {
                this.titleValidation(newArrayTitle[i], 'og:title');
            }
        }
        // title info Validation end

        // description info Validation start
        const newArrayDes = data.metas.filter((newarr) => newarr.key === 'og:description' | newarr.key === 'description')
        console.log(newArrayDes);

        for (let i = 0; i < newArrayDes.length; i++) {
            if (newArrayDes[i].key === 'og:description') {
                this.ogDescriptionValidation(newArrayDes[i]);
                break;
            } else {
                this.descriptionValidation(newArrayDes[i], 'og:description');
            }
        }
        // description info Validation end

        //image info Validation start
        const newArrayImage = data.metas.filter((newarr) => newarr.key === 'og:image')
        console.log(newArrayImage);

        if (newArrayImage[0].key === 'og:image') {
            this.ogImageValidation(newArrayImage[0]);
        }
        //image info Validation end
    }

    twitterInfo(socialInfo) {
        // card info Validation start
        const newArrayCard = socialInfo.metas.filter((newarr) => newarr.key === 'twitter:card');
        console.log(newArrayCard);
        if (newArrayCard.length > 0) {
            document.querySelector(".icon-card").innerHTML =
                ` <i class="ph-check-circle" style="color: green;"></i>`
            document.querySelector(".card-info").innerHTML =
                `<span> You set your <code>twitter:card</code> metatag to <b>${newArrayCard[0].value}</b>
      </span>`
        } else {
            document.querySelector(".icon-card").innerHTML =
                ` <i class="ph-x-circle" style="color: red;"></i>`;
            document.querySelector(".card-info").innerHTML =
                `<span> You didn't set your <code>twitter:card</code> to <b>summary_large_image</b>
      </span>`
        }

        //card info end

        //twitter:title start
        const newArrayTitle = socialInfo.metas.filter((newarr) => newarr.key === 'twitter:title' | newarr.key === 'title');
        console.log(newArrayTitle);

        for (let i = 0; i < newArrayTitle.length; i++) {
            if (newArrayTitle[i].key === 'twitter:title') {
                this.ogTitleValidation(newArrayTitle[i]);
                break;
            } else {
                this.titleValidation(newArrayTitle[i], 'twitter:title');
            }
        }

        //twitter:title end

        // description info Validation start
        const newArrayDes = socialInfo.metas.filter((newarr) => newarr.key === 'twitter:description' | newarr.key === 'description')
        console.log(newArrayDes);

        for (let i = 0; i < newArrayDes.length; i++) {
            if (newArrayDes[i].key === 'twitter:description') {
                this.ogDescriptionValidation(newArrayDes[i]);
                break;
            } else {
                this.descriptionValidation(newArrayDes[i], 'twitter:description');
            }
        }
        // description info Validation end
        //image info Validation start
        const newArrayImage = socialInfo.metas.filter((newarr) => newarr.key === 'og:image')
        console.log(newArrayImage);

        if (newArrayImage[0].key === 'og:image') {
            this.ogImageValidation(newArrayImage[0]);
        }
        //image info Validation end


    }

    ogTitleValidation(item) {

        document.querySelector('.title-info').innerHTML =
            `<i class="ph-check-circle"></i><span> <code>${item.key}</code> metatag found</span>`;
        console.log(`${item.key} length =` + item.value.length);
        if (item.value.length >= minlength && item.value.length <= maxlength) {
            document.querySelector(".twitter-title-icon").innerHTML =
                ` <i class="ph-check-circle" style="color: green;"></i>`
            document.querySelector(".title-length-info").innerHTML =
                `<i class="ph-check-circle"></i><span> The length of your title (${item.value.length} characters) is great<span>`;
        } else {
            document.querySelector(".twitter-title-icon").innerHTML = ` <i class="ph-info"></i>`
            document.querySelector(".title-length-info").innerHTML =
                `<i class="ph-info"></i><span> Your title should be between 30-60 characters, with a maximum of 90
     (currently ${item.value.length} characters)<span>`
        }
    }

    titleValidation(item, str) {
        document.querySelector(".twitter-title-icon").innerHTML = `<i class="ph-info"></i>`
        document.querySelector('.title-info').innerHTML =
            `<i class="ph-info"></i> <span>The <code>${str}</code> metatag is missing (Falling back to <code>title</code> tag)</span>`;
        console.log('title length =' + item.value.length);
        if (item.value.length >= minlength && item.value.length <= maxlength) {
            document.querySelector(".title-length-info").innerHTML =
                `<i class="ph-check-circle"></i><span> The length of your title (${item.value.length} characters) is great</span>`;
        } else {
            document.querySelector(".title-length-info").innerHTML =
                `<i class="ph-info"></i><span> Your title should be between 30-60 characters, with a maximum of 90
    (currently ${item.value.length} characters)</span>`
        }
    }

    ogDescriptionValidation(item) {
        document.querySelector(".icon-description").innerHTML =
            ` <i class="ph-check-circle" style="color: green;"></i>`
        document.querySelector('.description-info').innerHTML =
            `<i class="ph-check-circle"></i><span> <code>${item.key} </code> metatag found</span>`;
        document.querySelector(".description-length-info").innerHTML =
            `<i class="ph-check-circle"></i> <span>The length of your description (${item.value.length} characters) is great(recommended length up to 110 characters)</span>`;
        console.log(`${item.key} length =` + item.value.length);

    }

    descriptionValidation(item, str) {
        document.querySelector(".icon-description").innerHTML =
            ` <i class="ph-x-circle" style="color: red;"></i>`
        document.querySelector('.description-info').innerHTML =
            `<i class="ph-x-circle" style="color: red;"></i><span> The <code>${str}</code> metatag is missing</span>`;
        document.querySelector(".description-length-info").innerHTML =
            `<i class="ph-x-circle" style="color: red;"></i><span> Your description should be between 55 and 200 characters long, with a maximum of 300 (currently 0 characters)</span>`;
        console.log('description length =' + item.value.length);

    }

    ogImageValidation(item) {
        document.querySelector(".image-info").innerHTML =
            `<i class="ph-check-circle"></i> <span> <code> og:image </code> metatag found</span>`
        const img = new Image();
        img.src = item.value;
        if (!item.value.startsWith('https://')) {
            document.querySelector(".icon-image").innerHTML =
                ` <i class="ph-x-circle" style="color: red;"></i>`;
            document.querySelector(".image-info").innerHTML =
                `<i class="ph-x-circle"></i> <span> <code> og:image </code> can't be found at the defined URL</span>`
            document.querySelector(".img-size-info").innerHTML =
                `<i class="ph-x-circle"></i> <span>The ratio of your <code>og:image </code> isn't optimal</span>`
        }

        img.onload = function () {
            console.log('img width = ' + img.width + 'px', 'img height = ' + img.height + 'px')
            if (img.width < maxWidthImg && img.width > minWidthImg && img.height < maxHeightImg && img.height > minHeightImg) {
                document.querySelector(".icon-image").innerHTML =
                    ` <i class="ph-check-circle" style="color: green;"></i>`;
                document.querySelector(".img-size-info").innerHTML =
                    `<i class="ph-check-circle"></i>
        <span> Your <code>og:image </code> has the recommended ratio(recommended image size 1200 x 630)</span>`
            } else {
                document.querySelector(".icon-image").innerHTML =
                    ` <i class="ph-info"></i>`;
                document.querySelector(".img-size-info").innerHTML =
                    `<i class="ph-info"></i> <span>The ratio of your <code>og:image </code> isn't optimal(recommended image size 1200 x 630)</span>`
            }
        }
    }

}

const socialPreviewGenerator = new SocialPreviewGenerator();


