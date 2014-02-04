require 'execjs'
require 'react/source'
require 'react/jsx/template'

module React
  module JSX extend self
    def context
      # If execjs uses therubyracer, there is no 'global'. Make sure we have
      # it so JSX script can work properly.
      contents = 'var global = global || this;' +
        File.read(Source.bundled_path_for('JSXTransformer.js'))

      @context ||= ExecJS.compile(contents)
    end

    def setup(assets)
      tmp_path = Pathname(assets.root + '/tmp/react')
      FileUtils.mkdir_p tmp_path
      FileUtils.cp Source.bundled_path_for('react.js'), tmp_path.join('react.js')
      FileUtils.cp Source.bundled_path_for('JSXTransformer.js'), tmp_path.join('JSXTransformer.js')
      assets.append_path tmp_path
      assets.register_engine '.jsx', React::JSX::Template
    end

    def transform(code)
      result = context.call('JSXTransformer.transform', code)
      return result['code']
    end
  end
end
