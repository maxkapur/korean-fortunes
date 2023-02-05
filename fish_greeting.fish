function fish_greeting
    set idiom_color brblue           # idiom color
    set explanation_color -i white   # explanation color

    # Parse the fortune as a list of lines
    set fortune (string split "\n" (fortune korean))

    # Start out with the idiom color enabled
    set_color $idiom_color
    for text in $fortune
        echo $text

        # If the text contains a closing quotation mark then 
        # switch to the explanation color
        if string match -q "*”*" $text
            set_color $explanation_color
        end
    end
    set_color normal
end
