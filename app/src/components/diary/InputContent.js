import { ScrollView, Text } from "native-base";
import React from "react";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const InputContent = (props) => {
    const richText = React.useRef();
    return (
        <>
            <ScrollView>
                <RichEditor
                    // initialFocus={true}
                    // disabled={disabled}
                    // editorStyle={contentStyle} // default light style
                    ref={richText}
                    // style={styles.rich}
                    useContainer={true}
                    initialHeight={200}
                    enterKeyHint={'done'}
                    // containerStyle={{borderRadius: 24}}
                    placeholder={'please input content'}
                    initialContentHTML={props.content}
                    // editorInitializedCallback={editorInitializedCallback}
                    // onChange={handleChange}
                    // onHeightChange={handleHeightChange}
                    // onPaste={handlePaste}
                    // onKeyUp={handleKeyUp}
                    // onKeyDown={handleKeyDown}
                    // onInput={handleInput}
                    // onMessage={handleMessage}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    // onCursorPosition={handleCursorPosition}
                    pasteAsPlainText={true}
                    onChange={(content) => { props.setContent(content); }}
                />
            </ScrollView>
            {/* <RichToolbar
          // 현재 잘 동작이 안됨
          style={[styles.richBar, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={'enabled'}
          // iconTint={color}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          // onPressAddImage={onPressAddImage}
          // onInsertLink={onInsertLink}
          // iconSize={24}
          // iconGap={10}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            // actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            'insertEmoji',
            'insertHTML',
            'fontSize',
          ]} // default defaultActions
          iconMap={{
            // insertEmoji: phizIcon,
            [actions.foreColor]: ({ tintColor }) => <Text style={[styles.tib, { color: 'blue' }]}>FC</Text>,
            [actions.hiliteColor]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor, backgroundColor: 'red' }]}>BC</Text>
            ),
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.heading4]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
            ),
            // insertHTML: htmlIcon,
          }}
        // insertEmoji={handleEmoji}
        // insertHTML={handleInsertHTML}
        // insertVideo={handleInsertVideo}
        // fontSize={handleFontSize}
        // foreColor={handleForeColor}
        // hiliteColor={handleHiliteColor}
        /> */}
            <RichToolbar
                editor={richText}
                actions={[
                  actions.undo,
                  actions.redo,
                  actions.insertVideo,
                  actions.insertImage,
                  actions.setStrikethrough,
                  // actions.checkboxList,
                  actions.insertOrderedList,
                  actions.blockquote,
                  actions.alignLeft,
                  actions.alignCenter,
                  actions.alignRight,
                  actions.code,
                  actions.line,
      
                  actions.foreColor,
                  actions.hiliteColor,
                  actions.heading1,
                  actions.heading4,
                  'insertEmoji',
                  'insertHTML',
                  'fontSize',
                ]} // default defaultActions
                iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
            />
        </>
    )
}

export default InputContent;