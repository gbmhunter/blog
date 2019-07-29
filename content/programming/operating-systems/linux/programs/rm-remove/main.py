import drawSvg as draw

d = draw.Drawing(200, 100, origin='center')

d.setPixelScale(2)  # Set number of pixels per geometry unit
#d.setRenderSize(400,200)  # Alternative to setPixelScale

d.append(draw.Text('rm', 40, 0, 0))

d.saveSvg('example.svg')