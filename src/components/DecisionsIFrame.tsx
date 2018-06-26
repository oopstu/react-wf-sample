import * as React from "react";

class DecisionsIFrame extends React.Component {
    
    constructor(props: any) {
        super(props);
        this.onMyFrameLoad = this.onMyFrameLoad.bind(this);
    }

    public render() {
        return (
            <div>
                <iframe onLoad={this.onMyFrameLoad}
                    id="iframeworkflowchild"
                    src="#" style={{ border: 0, height: 70 + "%", width: 75 + "%" }}/>
             
            </div>
        );

    }

    public SetUrl(urlToSet: string) {
        document!.getElementById('iframeworkflowchild')!.setAttribute("src", urlToSet);  
    }

    private onMyFrameLoad(iframeElement: any) {
        // console.log('Iframe loaded');
        // console.log(iframeElement.target);
        // Make the frame ref a constant.
        const frame = iframeElement.target;
        frame.contentWindow.$("div[id^='formWrapper']").on("flowExecutionCompleted", () => {
            // alert("Flow completed!!");

            document!.getElementById('iframeworkflowchild')!.style.display = 'none';
        });
    }
}

export default DecisionsIFrame;