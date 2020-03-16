
Pod::Spec.new do |s|
  s.name         = "RNMeasureText"
  s.version      = "1.0.0"
  s.summary      = "RNMeasureText"
  s.description  = <<-DESC
                  RNMeasureText
                   DESC
  s.homepage     = "https://github.com/airamrguez/react-native-measure-text"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/airamrguez/react-native-measure-text.git", :tag => "master" }
  s.source_files  = "*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  
