REM mp4 to frames
REM -r original video fps

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1persontap.mp4" -r 15.656325 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1persontap\frame_%6d.png"

REM crop frames
REM -crop width x height + offset_left + offset_top

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x433+28+1007 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1persontap" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1persontap\*.png"

REM frames to gif
REM -delay 100/fps
REM -loop 0 for infinite loop
REM -page same width and height as -crop in previous command, but with 0 offsets

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 6.38719495156 -page 664x433+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1persontap\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1persontap.gif"

REM shrink frames
REM -resize is the box within which the image will shrink to fit inside while maintaining its aspect ratio

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1persontap" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1persontap\*.png"

REM frames to gif
REM -delay 100/fps
REM -loop 0 for infinite loop
REM -page new shrunken dimensions, with 0 offsets

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 6.38719495156 -page 332x217+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1persontap\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1persontap.gif"

REM that's it.

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1locationdrag.mp4" -r 19.609034 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1locationdrag\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x450+28+990 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1locationdrag" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1locationdrag\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 5.09969027541 -page 664x450+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1locationdrag\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1locationdrag.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1locationdrag" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1locationdrag\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 5.09969027541 -page 332x225+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1locationdrag\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1locationdrag.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1newentity.mp4" -r 16.808930 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1newentity\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x442+28+998 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1newentity" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1newentity\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 5.94921865937 -page 664x442+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1newentity\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1newentity.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1newentity" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1newentity\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 5.94921865937 -page 332x221+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1newentity\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1newentity.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1notentity.mp4" -r 21.987989 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1notentity\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x436+28+1004 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1notentity" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1notentity\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 4.54793751261 -page 664x436+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1notentity\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1notentity.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1notentity" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1notentity\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 4.54793751261 -page 332x218+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1notentity\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1notentity.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1negative.mp4" -r 16.166268 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1negative\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x528+28+912 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1negative" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task1negative\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 6.18571954888 -page 664x528+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1negative\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1negative.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1negative" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task1negative\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 6.18571954888 -page 332x264+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task1negative\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task1negative.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task2addtag.mp4" -r 21.099630 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task2addtag\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x485+28+955 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task2addtag" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task2addtag\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 4.7394196012 -page 664x485+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task2addtag\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task2addtag.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task2addtag" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task2addtag\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 4.7394196012 -page 332x243+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task2addtag\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task2addtag.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task2removetag.mp4" -r 15.067922 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task2removetag\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x320+28+1120 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task2removetag" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task2removetag\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 6.63661518821 -page 664x320+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task2removetag\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task2removetag.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task2removetag" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task2removetag\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 6.63661518821 -page 332x160+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task2removetag\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task2removetag.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task3.mp4" -r 20.575463 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task3\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x392+28+1048 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task3" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task3\*.png"

REM "C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 4.86015794638 -page 664x392+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task3\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task3.gif"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task3" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task3\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 4.86015794638 -page 332x196+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task3\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task3.gif"

REM

"C:\Users\Hao Ran Lee\Downloads\ffmpeg-20190826-0821bc4-win64-static\ffmpeg-20190826-0821bc4-win64-static\bin\ffmpeg.exe" -i "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task4.mp4" -r 31.391412 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task4\frame_%6d.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -crop 664x682+28+758 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task4" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\frames_task4\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\mogrify.exe" -resize 332x400 -path "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task4" "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\cropped_task4\*.png"

"C:\Program Files\ImageMagick-7.0.8-Q16\convert.exe" -delay 3.18558464334 -page 332x341+0+0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\shrunk_task4\*.png" -loop 0 "C:\Users\Hao Ran Lee\Downloads\data_scientist\react-firebase-authentication\screen_captures\task4.gif"