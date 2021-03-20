const fadeIn = (element, duration) => {
  (function increment(value = 0) {
    element.style.opacity = String(value);
    if (element.style.opacity !== "1") {
      setTimeout(() => {
        increment(value + 0.1);
      }, duration / 10);
    }
  })();
};

function getReleases() {
  return new Promise((resolve, reject) => {
    let everythingContainer = document.querySelector("#everythingContainer");
    everythingContainer.innerHTML = `
    <center>
          <video src="../assets/img/loader.webm" autoplay="true" loop></video></center>`
    fetch("https://api.github.com/repos/filcnaplo/filcnaplo/releases")
      .then((res) => res.json())
      .then((res_json) => {
        everythingContainer.innerHTML = `
        <div id="latestReleaseContainer" class="col w-md-75">
    </div>
    <div id="latestBetaContainer" class="col w-md-75">
    </div>
    <div id="releasesContainer" class="col w-md-75">
    </div>`
        let container = document.getElementById("releasesContainer");
        let latestPrereleaseContainer = document.querySelector("#latestBetaContainer");
        let latestReleaseContainer = document.querySelector("#latestReleaseContainer");
        container.innerHTML = `
          <h3 class="redhat mb-5" style = "font-weight: 500;" >Régebbi verziók</h3>`;
        latestReleaseContainer.innerHTML = `
    <h3 class="redhat mb-5" style="font-weight: 500;">Legújabb verzió</h3>`;
    latestPrereleaseContainer.innerHTML = `
    <h3 class="redhat mb-5" style="font-weight: 500;">Legújabb béta</h3>`;
        resolve(res_json);
      });
  });
}

getReleases().then((releases) => {
  let container = document.querySelector("#releasesContainer");
  let counter = 0;

  let latestReleaseContainer = document.querySelector("#latestReleaseContainer");
  let addedBeta = false;
  let addedFirst = false;
  let latestPrereleaseContainer = document.querySelector("#latestBetaContainer");
  
  function addFirstRelease(release) {
    let release_date = new Date(release.published_at);
    let compose = `
                    <div class="release row redhat align-items-center mt-5 mb-5">
                    <div class="col" style="white-space: nowrap;">
                    <a class="version mt-0 mb-0 text-black"  data-toggle="modal" data-target="#modal${counter}">${
      release.name
      }</a></div>
                    <div class="col">
                    <p class="date mt-0 mb-0">${release_date.toLocaleDateString()}</p></div>
  
                    <div class="col-md-3 mobilePaddingTop" style="padding-bottom:0"></div>
                    
                    <div class="col" style="white-space: nowrap;">
                    <a href="${release.html_url}" class="github text-dark">
                    <img src="../assets/img/icons/github-dark.svg" alt="Github" style="color:#212121" class="mr-1">
                    <span>GitHub</span></a>
                    </div>

                    <div class="col" >
                    <a href="${
      release.assets[0]
        ? release.assets[0].browser_download_url
        : "#"
      }" class="btn downloadButton text-white d-inline align-items-center mobileMarginLeft" style="white-space: nowrap; ${
      release.assets[0] ? "" : "display: none !important"
      }">
                    <img src="../assets/img/icons/downloads.svg" alt="Download" class="mr-1">
                    <span>Letöltés</span></a>
                    </div>

                        <div
      class="modal fade"
      id="modal${counter}"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${release.name}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${release.body.replace(/\r\n/g, "<br />")}
          </div>
        </div>
      </div>
    </div>`;

    // append as a child
    let releaseElement = document.createElement("div");
    releaseElement.innerHTML = compose;
    latestReleaseContainer.append(releaseElement);
  }

  function addRelease(release) {
    let release_date = new Date(release.published_at);
    let compose = `
                    <div class="release row redhat align-items-center mt-5 mb-5">
                    <div class="col" style="white-space: nowrap;">
                    <a class="version mt-0 mb-0 text-black"  data-toggle="modal" data-target="#modal${counter}">${
      release.name
      }</a></div>
                    <div class="col">
                    <p class="date mt-0 mb-0">${release_date.toLocaleDateString()}</p></div>
  
                    <div class="col-md-3 mobilePaddingTop" style="padding-bottom:0"></div>
                    
                    <div class="col" style="white-space: nowrap;">
                    <a href="${release.html_url}" class="github text-dark">
                    <img src="../assets/img/icons/github-dark.svg" alt="Github" style="color:#212121" class="mr-1">
                    <span>GitHub</span></a>
                    </div>

                    <div class="col" >
                    <a href="${
      release.assets[0]
        ? release.assets[0].browser_download_url
        : "#"
      }" class="btn downloadButton text-white d-inline align-items-center mobileMarginLeft" style="white-space: nowrap; ${
      release.assets[0] ? "" : "display: none !important"
      }">
                    <img src="../assets/img/icons/downloads.svg" alt="Download" class="mr-1">
                    <span>Letöltés</span></a>
                    </div>

                        <div
      class="modal fade"
      id="modal${counter}"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${release.name}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${release.body.replace(/\r\n/g, "<br />")}
          </div>
        </div>
      </div>
    </div>`;

    // append as a child
    let releaseElement = document.createElement("div");
    releaseElement.innerHTML = compose;
    container.append(releaseElement);
  }
  function addPrerelease(release) {
    let release_date = new Date(release.published_at);
    let compose = `
                    <div class="release row redhat align-items-center mt-5 mb-5">
                    <div class="col" style="white-space: nowrap;">
                    <a class="version mt-0 mb-0 text-black"  data-toggle="modal" data-target="#modal${counter}">${
      release.name
      }</a></div>
                    <div class="col">
                    <p class="date mt-0 mb-0">${release_date.toLocaleDateString()}</p></div>
  
                    <div class="col-md-3 mobilePaddingTop" style="padding-bottom:0"></div>
                    
                    <div class="col" style="white-space: nowrap;">
                    <a href="${release.html_url}" class="github text-dark">
                    <img src="../assets/img/icons/github-dark.svg" alt="Github" style="color:#212121" class="mr-1">
                    <span>GitHub</span></a>
                    </div>

                    <div class="col" >
                    <a href="${
      release.assets[0]
        ? release.assets[0].browser_download_url
        : "#"
      }" class="btn downloadButton text-white d-inline align-items-center mobileMarginLeft" style="white-space: nowrap; ${
      release.assets[0] ? "" : "display: none !important"
      }">
                    <img src="../assets/img/icons/downloads.svg" alt="Download" class="mr-1">
                    <span>Letöltés</span></a>
                    </div>

                        <div
      class="modal fade"
      id="modal${counter}"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${release.name}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${release.body.replace(/\r\n/g, "<br />")}
          </div>
        </div>
      </div>
    </div>`;

    // append as a child
    let releaseElement = document.createElement("div");
    releaseElement.innerHTML = compose;
    latestPrereleaseContainer.append(releaseElement);
  }

  for (let release of releases) {
    if (!addedFirst && !release.prerelease) {
      addedFirst = true;
      addFirstRelease(release);
    } else {
      if (release.prerelease && !addedBeta) {
        addPrerelease(release);
        addedBeta = true;
      } else {
        addRelease(release);
      }
    }
    counter++;
  }

  fadeIn(everythingContainer, 350);
});
