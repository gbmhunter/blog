---
author: gbmhunter
date: 2013-05-20 23:22:18+00:00
draft: false
title: Verilog
type: page
url: /programming/languages/verilog
---

# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Counters




A 4-bit Counter In Verilog



    
    module Count4Bit_v1_00 (
       output reg [3:0] count,
       output reg tc,
       input clock,
       input en,
       input reset
    );
       parameter period = 0;
    
       always @ (posedge clock)
    begin
       if(reset)
       begin
          count <= 4'b0000;
          tc <= 1'b0;
       end
       else
       begin
          if(en)
          begin
             if(count == period)
             begin
                tc <= 1'b1;
                count <= 4'b0000;
             end
             else
             begin
                count <= count + 1;
                tc <= 1'b0;
             end
          end
          else
          begin
             count <= count;
             tc <= tc;
          end
       end
    end
    
    endmodule




#  External Resources




[Embedded Micro](http://embeddedmicro.com/) has a great example showing how to create a [UART transceiver using verilog](http://embeddedmicro.com/tutorials/mojo/asynchronous-serial).
