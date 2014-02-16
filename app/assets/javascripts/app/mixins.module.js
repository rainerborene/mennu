var j = jQuery;

var AntiScroll = {

  antiscrollOptions: { initialDisplay: false, x: false },

  componentDidMount: function() {
    j('.antiscroll-wrap').antiscroll(this.antiscrollOptions);
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  componentDidUpdate: function() {
    this.resize();
  },

  componentWillUnmount: function(){
    window.removeEventListener('resize', this.resize);
  },

  resize: function(event){
    j('.antiscroll-inner').css({
      width: window.window.innerWidth,
      height: window.innerHeight - this.refs.wrap.getDOMNode().offsetTop
    });

    j('.antiscroll-wrap').data('antiscroll').refresh();
  }

};

module.exports = { AntiScroll: AntiScroll };
