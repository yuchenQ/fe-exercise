function fetchAllFeatures() {
  // in reality, this would have been a `fetch` call: // `fetch("/api/features/all")` return new Promise(resolve => { const sampleFeatures = { "extended-summary": true, "feedback-dialog": false };

  return new Promise((resolve) => {
    const sampleFeatures = { 'extended-summary': true, 'feedback-dialog': false };

    setTimeout(resolve, 100, sampleFeatures);
  });
}

let features;

const getFeatureState = async (state, { valid = true, value = '' } = {}) => {
  // if state invalid, pop up error "doesn't exist"
  let featureVal;

  try {
    if (!features) {
      features = await fetchAllFeatures();
      
      featureVal = await getFeatureReferences(state);
    }

    if (features[state]) {
      return {
        valid: true,
        featureVal,
      };
    } else {
      return { valid: false, value };
    }
  } catch (err) {
    return defaultVal;
    // handleErr(err);
  }
};

getFeatureState('extended-summary').then(function (isEnabled) {
  if (isEnabled) {
    showExtendedSummary();
  } else {
    showBriefSummary();
  }
}).catch(err => {
  if (err === 'doesn\'t exist') {
    errHandle();
  }
});

getFeatureState('feedback-dialog').then(function (isEnabled) {
  if (isEnabled) {
    makeFeedbackButtonVisible();
  }
});

const addDevOverrideForFeature = (state, value) => {
  features[state] = value;
}

addDevOverrideForFeature("extended-summary", true)

class EventEmitter {
  private eventMap<string, Array<Function>>
  register(event, cb)
  emit(event, ...args) {

  }
  cancel(event, cb)
  once(event, cb) {

  }
}

const message = {
  type: 'update',
  data: { }
}