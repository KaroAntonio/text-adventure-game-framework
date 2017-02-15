// Generated by CoffeeScript 1.11.1
(function() {
  var get_random_color, get_time, init_colors, init_listeners, init_scenes, restart, show_scene;

  window.init_game = function(w, h, scenes) {
    var go, n, size;
    n = 1;
    size = 30;
    go = {
      colors: init_colors(),
      start: get_time(),
      w: w,
      h: h,
      mouseX: w / 2,
      mouseY: h / 2,
      score: 0,
      t: 0,
      paused: true,
      scenes: scenes
    };
    init_listeners(go);
    init_scenes(go);
    return go;
  };

  window.update = function(go) {
    if (!go.paused) {
      return go.t += 1;
    }
  };

  init_scenes = function(go) {
    go.scene_frame = $('<div>');
    go.scene_frame.attr({
      id: 'scene-frame'
    });
    go.scene_frame.css({
      paddingLeft: 200,
      paddingTop: 200,
      paddingBottom: 200,
      width: go.w - 400,
      fontFamily: 'monospace'
    });
    $('body').append(go.scene_frame);
    return show_scene(go, 0);
  };

  show_scene = function(go, i) {
    var j, len, ref, results, token, token_div;
    go.scene_frame.empty();
    ref = go.scenes[i].scene;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      token = ref[j];
      token_div = $('<div>');
      token_div.text(token[token.type]);
      token_div.css({
        display: 'inline-block',
        paddingRight: 10,
        fontSize: 20
      });
      if (token.scene) {
        token_div.css({
          cursor: 'pointer',
          fontWeight: 'bold'
        });
        (function(token) {
          return token_div.click(function(e) {
            console.log(token.scene);
            return show_scene(go, token.scene);
          });
        })(token);
      }
      if (token.img) {
        token_div.css({
          content: 'url(assets/imgs/' + token.img + '.jpg)',
          width: 200,
          height: 'auto'
        });
      }
      results.push(go.scene_frame.append(token_div));
    }
    return results;
  };

  init_colors = function() {
    return {
      seed: get_random_color(),
      primary: get_random_color()
    };
  };

  init_listeners = function(go) {
    var handler;
    $(document).mousemove(function(e) {
      go['mouseX'] = e.clientX;
      return go['mouseY'] = e.clientY;
    });
    handler = function(e) {
      var key_map;
      if (!go.paused) {
        return key_map = {
          32: 'lamp'
        };
      } else {
        $('body').css({
          cursor: 'none'
        });
        return go.paused = false;
      }
    };
    return $(document).keypress(handler);
  };

  restart = function(go) {
    return go.colors = init_colors();
  };

  get_time = function() {
    var d;
    d = new Date();
    return d.getTime();
  };

  get_random_color = function() {
    var color, i, j, letters;
    letters = '0123456789ABCDEF';
    color = '#';
    for (i = j = 0; j <= 5; i = ++j) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

}).call(this);
