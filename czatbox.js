import { Picker } from '/assets/plugins/emoji-picker-element/index.js';

            function positionEmojiPickerInPopup() {
                const emojiPickerInPopup = document.querySelector(".speechbox-popup emoji-picker");
                const formatDiv = document.querySelector("div.format");
                const emojiButton = document.querySelector(".emoji-button");

                if (!emojiPickerInPopup || !formatDiv || !emojiButton) {
                    return;
                }

                const formatRect = formatDiv.getBoundingClientRect();
                const pickerParent = emojiPickerInPopup.offsetParent;
                const buttonRect = emojiButton.getBoundingClientRect();

                if (pickerParent) {
                    const parentRect = pickerParent.getBoundingClientRect();
                    const newBottom = parentRect.bottom - formatRect.top + 10;
                    emojiPickerInPopup.style.bottom = `${newBottom}px`;

                    let triangle = document.querySelector(".emoji-picker-triangle");
                    if (!triangle) {
                        triangle = document.createElement("div");
                        triangle.classList.add("emoji-picker-triangle");
                        emojiPickerInPopup.parentNode.insertBefore(triangle, emojiPickerInPopup.nextSibling);
                    }
                    const pickerRect = emojiPickerInPopup.getBoundingClientRect();
                    const buttonCenter = buttonRect.left + buttonRect.width / 2;
                    const pickerLeft = pickerRect.left;
                    const triangleLeft = buttonCenter - pickerLeft + 9;

                    triangle.style.left = `${triangleLeft}px`;
                    triangle.style.bottom = `${newBottom - 10}px`;
                }
            }

            document.addEventListener('DOMContentLoaded', async function() {
                let modulePath = `/assets/plugins/emoji-picker-element/i18n/${userLocale}.js`;
                try {
                    const localeModule = await import(modulePath);
                    const i18nData = localeModule.default || {};

                    const emojiPicker = new Picker({
                        i18n: i18nData,
                        locale: userLanguage,
                                                    customEmoji: null                                            });
                    document.querySelector('form#frmspeechbox').appendChild(emojiPicker);

                    let picker = document.querySelector('emoji-picker');
                    let eButton = document.querySelector('.emoji-button');
                    if(picker !== null && eButton !== null) {
                        eButton.addEventListener('click', function(e) {
                            e.preventDefault();
                            picker.classList.toggle('shown');
                            positionEmojiPickerInPopup();
                        });
                        picker.addEventListener('emoji-click', function(event) {
                            let insertEmoji = (event.detail.unicode !== undefined) ? event.detail.unicode : event.detail.name;
                            document.getElementById('message').value += insertEmoji;
                            document.getElementById('message').focus();
                            counter();
                            picker.classList.toggle('shown')
                        });
                    }
                } catch(error) {
                    console.error('Emoji picker module couldn’t be loaded');
                }
            });
            window.addEventListener("resize", positionEmojiPickerInPopup);
    
       
             
            let maxChars = 1000;
            let customEmoji;
                            const customEmojiJSON = '';
                        let ioConnected = false;
            let useSocketIo = false;
            let updateFancyTimer = null;
                            let speechbox_nick = localStorage.getItem('speechbox_nick');
            
            document.querySelector('#frmspeechbox input[name="name"]').value = speechbox_nick;
            let socketioHost = 'https://pubsub.speechbox.chat';
                            let prevMessage;
                useSocketIo = true;
                var ioClient = null;
                if (useSocketIo && socketioHost) {
                    ioClient = initSocketIo(box_id, socketioHost);
                }

                let incomingSound = new Audio('/assets/sounds/message-incoming.mp3');
                incomingSound.preload;
                audioVolume = localStorage.getItem('audio_volume') || 1;
                document.getElementById('notification-volume').value = audioVolume;
                incomingSound.volume = audioVolume;
                let allowAudio = false;

                document.body.addEventListener('click', function() {
                    allowAudio = true;
                });

                const allowedEmoji = ["\u2764\ufe0f","\ud83d\udc4d","\ud83d\ude4f","\ud83d\ude02","\ud83d\ude2e","\ud83d\ude22"];
                        const boxdataSettings = {"id":55535,"status":"aktiv","disp_email":0,"disp_homepage":0,"boxcodes":1,"image_upload":1,"smilies":1,"url_e_rep":1,"autofocus":0,"badword":null,"password":null,"captcha":1,"no_border_radius":0,"submit_button_outside":0,"show_online_count":1,"speechbox_ad":1};
            let overlayTimeout;
            let userScrolling = false;
            let lastScrollTop = 0;

            let messages;
                            messages = [{"id":28224605,"box_id":55535,"name":"Kontur","email":"","website":"","message":"Siemka","user_identifier":"48882ccf9e4c92609b4c750483ef4fca","post_date":"2026-01-31 17:41:24","post_utc_date":"2026-01-31 16:41:24","reaction_counts":null,"user_reactions":[],"reactions":[]},{"id":28224604,"box_id":55535,"name":"Speechbox Team","email":"","website":"","message":"Welcome to your Speechbox! This is your first message. Feel free to delete this from the dashboard. Enjoy!","user_identifier":null,"post_date":"2026-01-31 17:36:40","post_utc_date":"2026-01-31 16:36:40","reaction_counts":null,"user_reactions":[],"reactions":[]}]            
            document.addEventListener('DOMContentLoaded', function() {

                document.querySelector('.message-input-container :not(input, button)').addEventListener('click', function(e) {
                    document.getElementById('message').focus();
                });

                if(messages.length > 0) {
                    messages.sort((a, b) => {
                        const dateA = new Date(a.post_utc_date);
                        const dateB = new Date(b.post_utc_date);
                        return dateA - dateB;
                    });

                    window.setTimeout(function() {
                        messages.forEach(function(message) {
                            addFormattedMessage(message);
                        });

                        document.getElementById('loadingMessages').classList.remove('visible');

                        if(document.querySelector('.load-more-messages')) {
                            document.querySelector('.load-more-messages').classList.remove('inactive');
                        }

                        
                        if(document.body.classList.contains('speechbox-popup')) {
                            // Traditional chat (newest at bottom) - your existing code
                            const scrollContainer = document.querySelector('.scroll-container');
                            lastScrollTop = scrollContainer.scrollTop;
                            scrollContainer.addEventListener('scroll', function() {
                                if (scrollContainer.scrollTop < lastScrollTop) {
                                    userScrolling = true;
                                }
                                const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 20;
                                if (isAtBottom) {
                                    userScrolling = false;
                                }
                                lastScrollTop = scrollContainer.scrollTop;
                            });
                        } else {
                            // Inverted chat (newest at top)
                            const scrollContainer = document.querySelector('.scroll-container');
                            lastScrollTop = scrollContainer.scrollTop;
                            scrollContainer.addEventListener('scroll', function() {
                                if (scrollContainer.scrollTop > lastScrollTop) {
                                    userScrolling = true;
                                }
                                const isAtTop = scrollContainer.scrollTop < 20;
                                if (isAtTop) {
                                    userScrolling = false;
                                }
                                lastScrollTop = scrollContainer.scrollTop;
                            });
                        }

                        function updateScrollPosition() {
                            const scrollContainer = document.querySelector('.scroll-container');

                            if (!userScrolling) {
                                if (document.body.classList.contains('speechbox-popup')) {
                                    // Traditional chat - scroll to bottom
                                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                                } else {
                                    // Inverted chat - scroll to top
                                    scrollContainer.scrollTop = 0;
                                }
                            }
                        }

                    }, 300);
                } else {
                    document.getElementById('loadingMessages').classList.remove('visible');
                }

                const languageLinks = document.querySelectorAll('.language-chooser a');
                languageLinks.forEach(function(link) {
                    if(link.getAttribute('data-language-iso') == userLocale) {
                        link.classList.add('active');
                    }
                });

                                    function requestNotificationPermission(e) {
                        if (e) e.preventDefault();

                        Notification.requestPermission().then(permission => {
                            document.querySelectorAll('.notifications-never-asked, .notifications-enabled, .notifications-blocked').forEach(el => {
                                el.classList.remove('visible');
                            });

                            document.querySelector(permission === 'granted' ? '.notifications-enabled' : '.notifications-blocked').classList.add('visible');
                        });
                    }

                    const desktopNotificationsSupported = ('Notification' in window);

                    if (desktopNotificationsSupported) {
                        document.querySelector('.notifications-supported')?.style.setProperty('display', 'block');

                        if (Notification.permission === 'granted') {
                            document.querySelector('.notifications-enabled')?.classList.add('visible');
                        } else if (Notification.permission === 'denied') {
                            document.querySelector('.notifications-blocked')?.classList.add('visible');
                        } else {
                            document.querySelector('.notifications-never-asked')?.classList.add('visible');
                        }

                        [
                            '.notifications-never-asked',
                            'header.options .sound-toggle .sound-off',
                            '#settings .sound-settings .sound-full'
                        ].forEach(selector => {
                            const button = document.querySelector(selector);
                            if (button)
                                button.addEventListener('click', requestNotificationPermission);
                        });

                    } else {
                        document.querySelector('.notifications-not-supported')?.style.setProperty('display', 'block');
                    }
                
                applyFancytime();

                let messageInputField = document.querySelector('textarea');
                messageInputField.addEventListener('input', counter);

                document.querySelector('form.post').addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Force IME to commit any unconfirmed input
                    const textarea = document.getElementById('message');
                    textarea.blur();
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                    textarea.dispatchEvent(new Event('change', { bubbles: true }));

                    let nickname = document.querySelector('input[name="name"]').value;
                    if(nickname) {
                        localStorage.setItem('speechbox_nick', nickname);
                    }

                    let messageContent = document.getElementById('message').value.trim();

                    let filteredMessage = filterMessageContent(messageContent, customEmoji);
                    let filteredLength = filteredMessage.length;

                    if(filteredLength > maxChars) {
                        let errorEl = document.getElementById('error');
                        errorEl.textContent = lang.error_message_long;
                        errorEl.classList.add('fade-in');
                        errorEl.addEventListener('animationend', function() {
                            errorEl.classList.remove('fade-in');
                            errorEl.classList.add('visible');
                        });
                        textarea.focus();
                    } else {
                        document.getElementById('error').textContent = '';
                        document.getElementById('error').classList.remove('visible');
                        if(ioConnected) {
                            pushIoMessage(ioClient, box_id);
                        } else {
                            pushMessage(box_id);
                        }
                    }

                });

                if (document.querySelector('.load-more-messages')) {
                    document.querySelector('.load-more-messages').addEventListener('click', function (e) {
                        e.preventDefault();
                        let loadButton = this;
                        loadButton.classList.add('loading');

                        const messageContainers = document.querySelectorAll('.messages .message-container');
                        const lastMessageContainer = messageContainers[messageContainers.length - 1];

                        if(!lastMessageContainer) return;
                        const oldestId = lastMessageContainer.querySelector('p.msg').id.substring(1);

                        fetch('/box/' + box_id + '/append', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ oldest_message: oldestId }),
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success == 1 && data.messageCount > 0) {
                                data.messages.forEach(function (message) {
                                    addFormattedMessage(message, true);
                                });
                                loadButton.classList.remove('loading');
                            }
                            if (data.messageCount == 0 && document.querySelector('.load-more-messages')) {
                                document.querySelector('.load-more-messages').remove();
                            }
                        })
                        .catch((error) => {
                            console.error('Error: ', error);
                        });
                    });
                }

                document.querySelector('.settings-open').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('settings').classList.add('show');
                });
                document.querySelector('.settings-esc').addEventListener('click', function(e) {
                    e.preventDefault();
                    hideSettings();
                });

                document.addEventListener('keydown', function(event) {
                    if (event.key === 'Escape') {
                        hideSettings();
                        hideImageDialog();
                    }
                });
                document.querySelector('.image-dialog-esc').addEventListener('click', function(e) {
                    e.preventDefault();
                    hideImageDialog();
                });

                document.querySelectorAll('.language-chooser a').forEach(function(l) {
                    l.addEventListener('click', function(e) {
                        e.preventDefault();
                        localStorage.setItem('user_language', l.dataset.languageIso);
                        let currentUrl = window.location.href;
                        let newUrl = currentUrl.replace(/\?lang=\w{2}-\w{2}/, '');
                        window.location.href = newUrl;
                    });
                });

                let audioVolumeInput = document.getElementById('notification-volume');
                if(audioVolumeInput !== null) {

                    audioVolumeInput.addEventListener('change', function() {
                        setAudioVolume(this.value);
                    });

                    document.querySelector('#settings .sound-off').addEventListener('click', function(e) {
                        e.preventDefault();
                        audioVolumeInput.value = 0;
                        setAudioVolume(0);
                        document.querySelector('header.options .sound-off').style.display = 'block';
                        document.querySelector('header.options .sound-full').style.display = 'none';
                    });

                    document.querySelector('#settings .sound-full').addEventListener('click', function(e) {
                        e.preventDefault();
                        audioVolumeInput.value = 1;
                        setAudioVolume(1);
                        document.querySelector('header.options .sound-off').style.display = 'none';
                        document.querySelector('header.options .sound-full').style.display = 'block';
                    });

                    document.querySelector('header.options .sound-off').addEventListener('click', function(e) {
                        e.preventDefault();
                        audioVolumeInput.value = 1;
                        setAudioVolume(1);
                        document.querySelector('header.options .sound-off').style.display = 'none';
                        document.querySelector('header.options .sound-full').style.display = 'block';
                    });

                    document.querySelector('header.options .sound-full').addEventListener('click', function(e) {
                        e.preventDefault();
                        audioVolumeInput.value = 0;
                        setAudioVolume(0);
                        document.querySelector('header.options .sound-off').style.display = 'block';
                        document.querySelector('header.options .sound-full').style.display = 'none';
                    });
                }

                const scrollContainer = document.querySelector(".scroll-container");
                const messagesContainer = scrollContainer.querySelector("section.messages");
                const mainElement = document.querySelector("body");

                const updatePaddingClass = () => {
                    if (scrollContainer.scrollHeight > scrollContainer.clientHeight) {
                        scrollContainer.classList.remove("no-scrollbar");
                    } else {
                        scrollContainer.classList.add("no-scrollbar");
                    }
                };

                updatePaddingClass();
                window.addEventListener("resize", updatePaddingClass);
                const observer = new MutationObserver(() => {
                    updatePaddingClass();
                });
                observer.observe(messagesContainer, { childList: true, subtree: true });

                /* TOOLTIPS */
                addTooltips();

                            });

            function addTooltips(elementsSelector) {
                if(!elementsSelector) {
                    elementsSelector = '.boxcode-button, .image-dialog-button, .emoji-button, .image-uploaded-container button, .settings-open, #frmsubmit, .sound-toggle a';
                }
                if(!isTouchOnlyDevice()) {
                    // Create a single tooltip element that we'll reuse
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';

                    // Create the arrow element
                    const arrow = document.createElement('div');
                    arrow.className = 'tooltip-arrow';
                    tooltip.appendChild(arrow);

                    // Create a content container for the text
                    const content = document.createElement('div');
                    content.className = 'tooltip-content';
                    tooltip.appendChild(content);

                    document.body.appendChild(tooltip);

                    // Store timeoutID to manage delays
                    let tooltipDelay = null;
                    let currentElement = null;

                    // Process all tooltip elements
                    const elements = document.querySelectorAll(elementsSelector);
                    elements.forEach(el => {
                        if(el && el.hasAttribute('title')) {
                            // Store the title value in a data attribute
                            const originalTitle = el.getAttribute('title');
                            el.setAttribute('data-tooltip', originalTitle);

                            // Remove the title attribute completely to prevent browser tooltip
                            el.removeAttribute('title');

                            el.addEventListener('mouseover', (e) => {
                                // Clear any existing timeout
                                if (tooltipDelay) {
                                    clearTimeout(tooltipDelay);
                                }

                                currentElement = el;

                                // Set a delay before showing the tooltip
                                tooltipDelay = setTimeout(() => {
                                    content.textContent = el.getAttribute('data-tooltip');
                                    tooltip.classList.add('visible');
                                    positionTooltip(tooltip, el, arrow);
                                    tooltipDelay = null;
                                }, 500);
                            });

                            el.addEventListener('mouseout', () => {
                                // Clear the timeout if mouse leaves before tooltip is shown
                                if (tooltipDelay) {
                                    clearTimeout(tooltipDelay);
                                    tooltipDelay = null;
                                }

                                if (currentElement === el) {
                                    tooltip.classList.remove('visible');
                                    currentElement = null;
                                }
                            });
                        }
                    });

                    // Global document mouse move to update tooltip position if needed
                    document.addEventListener('mousemove', (e) => {
                        if (tooltip.classList.contains('visible') && currentElement) {
                            positionTooltip(tooltip, currentElement, arrow);
                        }
                    });

                    // Handle scroll events to reposition the tooltip
                    document.addEventListener('scroll', () => {
                        if (tooltip.classList.contains('visible') && currentElement) {
                            positionTooltip(tooltip, currentElement, arrow);
                        }
                    }, { passive: true });
                }
            }

            function positionTooltip(tooltip, element, arrow) {
                const rect = element.getBoundingClientRect();
                const container = element.closest('.tooltip-container') || document.body;
                const containerRect = container.getBoundingClientRect();

                // Set content and measure
                tooltip.style.visibility = 'hidden';
                tooltip.style.display = 'block';
                const tooltipRect = tooltip.getBoundingClientRect();

                // Calculate the available space above and below
                const spaceAbove = rect.top;
                const spaceBelow = window.innerHeight - rect.bottom;

                // By default, place above unless there's not enough space
                const placeBelow = spaceAbove < tooltipRect.height && spaceBelow >= tooltipRect.height;

                // Default position (horizontal center)
                let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

                // Adjust horizontal position to keep tooltip within viewport
                if (left + tooltipRect.width > window.innerWidth) {
                    left = window.innerWidth - tooltipRect.width - 5;
                }
                if (left < 0) {
                    left = 5;
                }

                // Position the tooltip vertically
                let top;
                if (placeBelow) {
                    top = rect.bottom + 7;
                    tooltip.classList.add('below');
                    tooltip.classList.remove('above');
                } else {
                    top = rect.top - tooltipRect.height - 7;
                    tooltip.classList.add('above');
                    tooltip.classList.remove('below');
                }

                // Position the tooltip
                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;

                // Position the arrow to point at the element's center
                const elementCenterX = rect.left + (rect.width / 2);

                // The key change: Use the actual position of the tooltip after adjustments
                // and account for the arrow width (12px total = 6px on each side)
                const arrowLeft = elementCenterX - left - 6;

                // Keep the arrow within the tooltip's bounds
                const minArrowLeft = 10; // minimum distance from tooltip edge
                const maxArrowLeft = tooltipRect.width - 10; // maximum distance from left

                const constrainedArrowLeft = Math.max(minArrowLeft, Math.min(arrowLeft, maxArrowLeft));
                arrow.style.left = `${constrainedArrowLeft}px`;

                // Finally, make the tooltip visible again
                tooltip.style.visibility = '';
                tooltip.style.display = '';
            }

            let lastSessionUpdate = Date.now();
            document.addEventListener('mousemove', updateSession);
            document.addEventListener('keypress', updateSession);

            function updateSession() {
                const now = Date.now();
                if (now - lastSessionUpdate > 300000) { // 5min
                    fetch('/box/55535/update-session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    lastSessionUpdate = now;
                }
            }

            function setAudioVolume(volume) {
                localStorage.setItem('audio_volume', volume);
                incomingSound.volume = volume;
                incomingSound.pause();
                incomingSound.currentTime = 0;
                incomingSound.play();
            }

            function recoverPrevMessage() {
                if(prevMessage) {
                    document.getElementById('message').value = prevMessage.message;
                }
            }

            function scrollToBottom() {
                const scrollContainer = document.querySelector('.scroll-container');
                if (!userScrolling) {
                    const isAtBottom = () => {
                        const scrollBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight;
                        return scrollBottom <= 5;
                    };
                    const scroll = () => {
                        if(!isAtBottom()) {
                            scrollContainer.scrollTop = scrollContainer.scrollHeight;
                            console.log('just scrolled');
                        }
                    };
                    scroll();
                    const startTime = Date.now();
                    const intervalId = setInterval(() => {
                        scroll();
                        if (Date.now() - startTime >= 1000) {
                            clearInterval(intervalId);
                        }
                    }, 100);
                }
            }

            function resetUserScrolling() {
                userScrolling = false;
                scrollToBottom();
            }

            function pushMessage(box_id) {
                if(!box_id) return;
                if(!ioConnected && useSocketIo) {
                    document.querySelector('.refresh-button').style.display = 'block';
                }
                let message = document.querySelector('textarea').value;

                let imageUrl = document.getElementById('insertImageUrl').value;
                let imageDescription = document.getElementById('image-description').value;
                const isValidUrl = /^https?:\/\/\S+\.\S+$/.test(imageUrl);
                if (isValidUrl) {
                    if(message.length > 0)
                        message += "\n";
                    message += '![' + imageDescription + '](' + imageUrl + ')';
                }

                let pushData = {
                    id: box_id,
                    name: document.querySelector('input[name="name"]').value,
                    message: message,
                    request: 'ajax'
                };

                if (localStorage.getItem('captcha_solved') === 'true') {
                    pushData['captcha_solved'] = true;
                    pushData['captchaToken'] = localStorage.getItem('captcha_token');
                }

                if(document.querySelector('input[name="email"]') != null)
                    pushData['email'] = document.querySelector('input[name="email"]').value;
                if(document.querySelector('input[name="website"]') != null)
                    pushData['website'] = document.querySelector('input[name="website"]').value;

                // Add captcha data if we have it
                const captchaToken = localStorage.getItem('captcha_token');
                const captchaSolution = localStorage.getItem('captcha_solution');
                if(captchaToken && captchaSolution) {
                    pushData['captchaToken'] = captchaToken;
                    pushData['solution'] = captchaSolution;
                }

                fetch('/box/' + box_id + '/post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pushData),
                })
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then((text) => {
                            console.error('Raw server response:', text);
                            throw new Error(`HTTP ${response.status} - ${text}`);
                        });
                    }
                    return response.json().catch((jsonError) => {
                        console.error('Raw server response (non-JSON):', response);
                        throw new Error('Invalid JSON response received from the server.');
                    });
                })
                .then((data) => {
                    if(data.success == 1) {
                        addFormattedMessage(data);
                        document.getElementById('message').value = '';
                        document.querySelector('.message-input-container .grow').dataset.replicatedValue = '';
                        document.getElementById('message').setAttribute('required', 'required');
                        resetImagePreview();
                        counter();
                        document.getElementById('message').focus();
                    } else {
                        if(data.require_captcha == 1) {
                            localStorage.setItem('pending_message', JSON.stringify({
                                name: pushData.name,
                                message: pushData.message,
                                email: pushData.email,
                                website: pushData.website
                            }));
                            requestCaptcha().then(() => {
                            });
                        } else {
                            log('🚨 Received error code: ' + data.error_message);
                            if(data.timeout)
                                log('⏱️ Suggested timeout: ' + data.timeout);
                            let errorEl = document.getElementById('error');
                            errorEl.textContent = lang[data.error_message];
                            errorEl.classList.add('fade-in');
                            errorEl.addEventListener('animationend', function() {
                                errorEl.classList.remove('fade-in');
                                errorEl.classList.add('visible');
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error: ', error.message);
                });
            }

            // Modified requestCaptcha function to handle message submission
            async function requestCaptcha() {
                try {
                    // First get the captcha (GET request, no formData needed)
                    const response = await fetch(socketioHost + '/captcha/generate', {
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'omit',
                        headers: {
                            'Accept': 'application/json',
                            'Origin': 'https://www.speechbox.chat/'
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const renderedCaptcha = await response.json();

                    if (renderedCaptcha.success) {
                        createCaptchaElements(renderedCaptcha, async function(e) {
                            e.preventDefault();

                            const formData = {
                                solution: document.querySelector('input[name=solution]').value,
                                token: document.querySelector('input[name=token]').value
                            };

                            // Now verify the solution (POST request with formData)
                            try {
                                const verifyResponse = await fetch(socketioHost + '/captcha', {
                                    method: 'POST',
                                    mode: 'cors',
                                    credentials: 'omit',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'Origin': 'https://www.speechbox.chat/'
                                    },
                                    body: JSON.stringify(formData)
                                });

                                const result = await verifyResponse.json();

                                if (result.success) {
                                    // Store token and solution
                                    localStorage.setItem('captcha_token', result.captchaToken);
                                    localStorage.setItem('captcha_solved', 'true');

                                    // Clear error message
                                    const errorEl = document.getElementById('error');
                                    errorEl.textContent = '';
                                    errorEl.classList.remove('visible');

                                    // Remove captcha and show form
                                    document.querySelector('captcha').remove();
                                    document.getElementById('frmspeechbox').style.display = '';

                                    // Get the pending message
                                    const pendingMessage = JSON.parse(localStorage.getItem('pending_message'));
                                    if (pendingMessage) {
                                        // Build the submission data
                                        const pushData = {
                                            id: box_id,
                                            name: pendingMessage.name,
                                            message: pendingMessage.message,
                                            request: 'ajax'
                                        };

                                        if (pendingMessage.email) pushData.email = pendingMessage.email;
                                        if (pendingMessage.website) pushData.website = pendingMessage.website;

                                        pushData.captchaToken = result.captchaToken;
                                        pushData.solution = formData.solution;

                                        fetch('/box/' + box_id + '/post', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(pushData)
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.success) {
                                                localStorage.removeItem('pending_message');
                                                addFormattedMessage(data);
                                                document.getElementById('message').value = '';
                                                document.querySelector('.message-input-container .grow').dataset.replicatedValue = '';
                                                counter();
                                                document.getElementById('message').focus();
                                            }
                                        });
                                    }
                                } else {
                                    // Show error and keep current captcha
                                    let errorEl = document.getElementById('error');
                                    errorEl.textContent = lang.error_captcha_wrong || 'Invalid captcha solution';
                                    errorEl.classList.add('fade-in');
                                    errorEl.addEventListener('animationend', function() {
                                        errorEl.classList.remove('fade-in');
                                        errorEl.classList.add('visible');
                                    });
                                }
                            } catch (error) {
                                console.error('Error verifying captcha:', error);
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error loading captcha:', error);
                }
            }

            // Shared function to create and insert captcha DOM elements
            function createCaptchaElements(renderedCaptcha, onSubmit) {
                // Remove any existing captchas
                const existingCaptchas = document.querySelectorAll('captcha');
                existingCaptchas.forEach(element => element.remove());

                // Create main captcha container
                const captcha = document.createElement('captcha');

                // Create form
                const form = document.createElement('form');
                form.id = 'svgCaptchaForm';
                form.setAttribute('action', 'post');
                form.setAttribute('method', 'post');
                form.className = 'captcha-container';

                // Create hint paragraph
                const hint = document.createElement('p');
                hint.textContent = lang.captcha_hint;

                // Create captcha image container
                const captchaImg = document.createElement('div');
                captchaImg.className = 'captcha-img';
                captchaImg.innerHTML = renderedCaptcha.svg;

                // Create input container
                const inputContainer = document.createElement('div');
                inputContainer.style.marginTop = '1em';

                // Create hidden token input
                const tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'token';
                tokenInput.value = renderedCaptcha.token;

                // Create solution input
                const solutionInput = document.createElement('input');
                solutionInput.type = 'text';
                solutionInput.name = 'solution';
                solutionInput.className = 'eingabe';
                solutionInput.setAttribute('placeholder', lang.captcha_solution_placeholder);

                // Create submit button container
                const submitContainer = document.createElement('div');

                // Create submit button
                const submitButton = document.createElement('input');
                submitButton.type = 'submit';
                submitButton.value = lang.captcha_send;

                // Build the DOM structure
                inputContainer.appendChild(tokenInput);
                inputContainer.appendChild(solutionInput);
                submitContainer.appendChild(submitButton);

                form.appendChild(hint);
                form.appendChild(captchaImg);
                form.appendChild(inputContainer);
                form.appendChild(submitContainer);
                captcha.appendChild(form);

                // Add form submission handler using the provided callback
                form.addEventListener('submit', onSubmit);

                // Insert into page
                const captchaForm = document.getElementById('frmspeechbox');
                captchaForm.parentNode.insertBefore(captcha, captchaForm.nextSibling);
                captchaForm.style.display = 'none';

                // Focus on the solution input
                solutionInput.focus();
            }

            function initSocketIo(box_id, socketioHost) {
                if (!box_id || box_id === 'undefined') return null;
                var socket = io(socketioHost + '/chat', {
                    transports: ["websocket", "polling"],
                    forceNew: true,
                    reconnection: true,
                    reconnectionDelay: 1000,         // Start with 1 second delay
                    reconnectionDelayMax: 60000,     // Maximum delay of 1 minute
                    reconnectionAttempts: Infinity,  // Never stop trying to reconnect
                    randomizationFactor: 0.5,        // Add randomization to prevent thundering herd
                    timeout: 20000,                  // Increase connection timeout (default is 20000)
                    upgrade: true,                   // Allow transport upgrade (e.g., from polling to websocket)
                    autoConnect: true                // Connect automatically (default)
                });

                // Subscribe to new messages
                socket.on('new_message', function(message) {
                    log('📨 socket.io: New message', message);

                    if (document.getElementById('m' + message.id)) {
                        log('🔁 socket.io: Discarding duplicate ' + message.id);
                    } else {
                        addFormattedMessage(message);

                        if(allowAudio === true && (prevMessage === undefined || (prevMessage.name != message.name))) {
                            incomingSound.pause();
                            incomingSound.currentTime = 0;
                            incomingSound.play();
                        }

                        let currentUsername = document.querySelector('input[name="name"]').value;
                        if (message.name !== currentUsername) {
                            showMessageNotification(message.name, message.message);
                        }
                    }
                });

                socket.on('error_message', function(data) {
                    recoverPrevMessage();

                    if(data.error) {
                        log('🚨 Received error code: ' + data.error);
                        if(data.timeout)
                            log('⏱️ Suggested timeout: ' + data.timeout);
                        let errorEl = document.getElementById('error');
                        errorEl.textContent = lang[data.error];
                        errorEl.classList.add('fade-in');
                        errorEl.addEventListener('animationend', function() {
                            errorEl.classList.remove('fade-in');
                            errorEl.classList.add('visible');
                        });
                        document.getElementById('message').focus();
                    }
                });

                socket.on('require_captcha', function(requiredCaptcha) {
                    log('🧮 socket.io: Captcha required');
                    recoverPrevMessage();

                    createCaptchaElements(requiredCaptcha, function(e) {
                        e.preventDefault();
                        if (!socketioHost) return;

                        const formData = {
                            solution: document.querySelector('input[name=solution]').value,
                            token: document.querySelector('input[name=token]').value
                        };

                        if (!formData.solution || !formData.token) return;

                        document.getElementById('error').textContent = '';
                        document.getElementById('error').classList.remove('visible');
                        ioClient.emit('captcha', formData);
                    });
                });

                socket.on('captcha', function(data) {
                    if (data.success && data.captchaToken) {
                        localStorage.setItem('captcha_token', data.captchaToken);
                        document.querySelector('.captcha-container').remove();
                        document.getElementById('frmspeechbox').style.display = 'block';
                        pushIoMessage(socket, box_id);
                    } else {
                        let errorEl = document.getElementById('error');
                        errorEl.textContent = lang.error_captcha_wrong;
                        errorEl.classList.add('fade-in');
                        errorEl.addEventListener('animationend', function() {
                            errorEl.classList.remove('fade-in');
                            errorEl.classList.add('visible');
                        });
                    }
                });

                socket.on('new_version', function() {
                    window.location.reload();
                });

                let visitorUpdateTimeout;
                let lastVisitorCount = 0;

                socket.on('room_count', function(data) {
                    lastVisitorCount = data.count;
                    if (!visitorUpdateTimeout) {
                        visitorUpdateTimeout = setTimeout(() => {
                            if (document.getElementById('visitorcount')) {
                                document.getElementById('visitorcount').textContent = lastVisitorCount;
                                document.querySelector('.visitor-count').style.opacity =
                                    lastVisitorCount > 1 ? 0.75 : 0;
                            }
                            visitorUpdateTimeout = null;
                        }, 2000);
                    }
                });

                let typingTimer;
                document.querySelector('textarea').addEventListener('input', function() {
                    if (!ioConnected) return;
                    socket.emit('typing', { roomId: `speech${box_id}` });
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(() => {
                        socket.emit('stop_typing', { roomId: `speech${box_id}` });
                    }, 10000);
                });

                socket.on('typing_count', function(data) {
                    const typingStatus = document.querySelector('.someones-typing');

                    let othersTyping = 0;
                    if (data && Array.isArray(data.typingUsers)) {
                        othersTyping = data.typingUsers.filter(id => id !== socket.id).length;
                    }

                    if (othersTyping > 0) {
                        typingStatus.textContent = othersTyping === 1
                            ? lang.one_user_typing
                            : lang.multiple_users_typing.replace('%d', othersTyping);
                        typingStatus.style.opacity = '1';
                        typingStatus.classList.add('active');
                    } else {
                        typingStatus.style.opacity = '0';
                        typingStatus.classList.remove('active');
                    }
                });

                // Show emoji reaction button on mobile touch devices on every message (no hover possible)
                const isTouchDevice = (
                    'ontouchstart' in window ||
                    navigator.maxTouchPoints > 0 ||
                    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                );

                function showEmojiTogglesOnMobile(container = document) {
                    container.querySelectorAll('a.emoji-list-toggle').forEach(button => {
                        button.classList.add('always-visible');
                    });
                }

                if (isTouchDevice) {
                    // Apply to all existing buttons
                    showEmojiTogglesOnMobile();

                    // Observe future DOM changes
                    const observer = new MutationObserver(mutations => {
                        for (const mutation of mutations) {
                            mutation.addedNodes.forEach(node => {
                                if (node.nodeType === 1) {
                                    // If a new message div is added, or contains emoji buttons
                                    if (node.matches('a.emoji-list-toggle')) {
                                        node.classList.add('always-visible');
                                    } else {
                                        showEmojiTogglesOnMobile(node);
                                    }
                                }
                            });
                        }
                    });

                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                }

                document.addEventListener('click', function(event) {
                    const reactionEl = event.target.closest('.reaction');
                    if (reactionEl) {
                        const messageId = reactionEl.parentElement.parentElement.querySelector('.msg').getAttribute('id').substring(1);
                        const emoji = reactionEl.dataset.emoji;
                        toggleReaction(emoji, messageId);
                    }
                });

                toggleReaction = function(emoji, messageId) {
                    const allowed = allowedEmoji.includes(emoji);
                    if(!allowed) return;
                    const messageEl = document.querySelector(`p.msg[id="m${messageId}"]`);
                    if (!messageEl) return;
                    let reactionsContainer = messageEl.parentElement.querySelector('.reactions');
                    if (reactionsContainer) {
                        const existingReaction = reactionsContainer.querySelector(`.reaction[data-emoji="${emoji}"]`);
                        if (existingReaction && existingReaction.classList.contains('user-reacted')) {
                            addRemove = 'remove';
                        } else {
                            addRemove = 'add';
                        }
                    } else {
                        addRemove = 'add';
                    }
                    const sendObject = {
                        roomId: `speech${box_id}`,
                        messageId: messageId,
                        emoji: emoji,
                        addRemove: addRemove,
                        userIdentifier: userIdentifier
                    };
                    socket.emit('toggle_reaction', sendObject);
                    fetch('/box/' + box_id + '/reaction', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            messageId: messageId,
                            emoji: emoji
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        // console.log('response from php server: ', data);
                    });
                }

                socket.on('reaction_updated', function(data) {
                    const { messageId, emoji, addRemove, userIdentifier } = data;
                    log('😀 Reaction arrived for MessageId ' + messageId + ': ' + addRemove + ' ' + emoji);
                    const messageEl = document.querySelector(`p.msg[id="m${messageId}"]`);
                    const isCurrentUser = userIdentifier === localStorage.getItem('user_identifier');
                    if (messageEl) {
                        let reactionsContainer = messageEl.parentElement.querySelector('.reactions');
                        if (!reactionsContainer) {
                            reactionsContainer = document.createElement('div');
                            reactionsContainer.className = 'reactions';
                            messageEl.parentElement.appendChild(reactionsContainer);
                        }
                        const reactionEl = reactionsContainer.querySelector(`.reaction[data-emoji="${emoji}"]`);
                        if (reactionEl) {
                            const countEl = reactionEl.querySelector('.reaction-count');
                            const count = parseInt(countEl.textContent);
                            if (isCurrentUser) {
                                if (addRemove === 'add') {
                                    reactionEl.classList.add('user-reacted');
                                    countEl.textContent = count + 1;
                                } else if (addRemove === 'remove') {
                                    reactionEl.classList.remove('user-reacted');
                                    if (count === 1) {
                                        reactionEl.remove();
                                    } else {
                                        countEl.textContent = count - 1;
                                    }
                                }
                            } else {
                                if (addRemove === 'add') {
                                    countEl.textContent = count + 1;
                                } else if (addRemove === 'remove') {
                                    if (count === 1) {
                                        reactionEl.remove();
                                    } else {
                                        countEl.textContent = count - 1;
                                    }
                                }
                            }
                        } else if (addRemove === 'add') {
                            const newReactionEl = document.createElement('a');
                            newReactionEl.className = 'reaction';
                            newReactionEl.dataset.emoji = emoji;
                            if (isCurrentUser) {
                                newReactionEl.classList.add('user-reacted');
                            }

                            newReactionEl.innerHTML = `<span class="emoji">${emoji}</span> <span class="reaction-count">1</span>`;
                            reactionsContainer.appendChild(newReactionEl);
                        }
                    }
                });

                socket.on('connect', function() {
                    ioConnected = true;
                    log('🔗✅ socket.io: Connection succeeded, using ' + socket.io.engine.transport.name);
                    document.querySelector('.refresh-button').style.display = 'none';
                    let captchaToken = localStorage.getItem('captcha_token');
                    socket.emit('join', {
                        boxId: box_id,
                        captchaToken: captchaToken,
                        version: 1.0
                    });
                });

                socket.on('connect_error', function(error) {
                    ioConnected = false;
                    document.querySelector('.refresh-button').style.display = 'block';
                    log('🔗❌ socket.io: Connection lost');
                });

                socket.on('disconnect', function() {
                    ioConnected = false;
                    document.querySelector('.refresh-button').style.display = 'block';
                    log('🔗🔚 socket.io: Disconnected');
                });

                socket.on('reconnect', function() {
                    ioConnected = true;
                    document.querySelector('.refresh-button').style.display = 'none';
                });

                socket.on('reconnect_attempt', (attemptNumber) => {
                    log(`🔗🔁 Reconnection attempt #${attemptNumber}...`);
                });

                socket.on('reconnect_error', function() {
                    log('🔗🚨 socket.io: Reconnection attempt failed');
                });

                socket.io.on('close', (reason) => {
                    log('🔗⛔ Socket closed: ' + reason);
                });

                return socket;
            }

            function pushIoMessage(socket) {
                if (!ioConnected) {
                    return false;
                }

                const messageInput = document.getElementById('message');
                let message = messageInput.value.trim();

                let name = getInputValue('name');
                let email = getInputValue('email');
                let website = getInputValue('website');

                prevMessage = { name: name, message: message };

                let imageUrl = document.getElementById('insertImageUrl').value;
                let imageDescription = document.getElementById('image-description').value;
                const isValidUrl = /^https?:\/\/\S+\.\S+$/.test(imageUrl);

                if (isValidUrl) {
                    if(message.length > 0)
                        message += "\n";
                    message += '![' + imageDescription + '](' + imageUrl + ')';
                }

                if (!message) {
                    return false;
                }

                let messageData = {
                    boxId: box_id,
                    forceCaptcha: 1,
                    name: name,
                    email: email,
                    website: website,
                    message: message
                };

                messageInput.disabled = true;

                socket.emit('new_clientmessage', messageData, function(ack) {
                    messageInput.disabled = false;
                    messageInput.focus();
                    if (ack && ack.success) {
                        messageInput.value = '';
                        messageInput.setAttribute('required', 'required');
                        resetImagePreview();
                    } else if(ack && !ack.success) {
                        // not really sure when this happens, because server usually transmits 'error_message' in case of error
                    } else {
                        log('📶🚫 Received nothing back from Socket Server: Offline?');
                    }
                });

                return true;
            }

            function getInputValue(name) {
                let field = document.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
                return field ? field.value : undefined;
            }

            function addFormattedMessage(messageJson, append = false) {
                if(!messageJson) return;
                let messageFormatted = formatMessage(messageJson.message);
                const newMessageElement = createMessageElement(messageJson, messageFormatted);
                if(append === true) {
                    var loadMoreMessages = document.querySelector('.load-more-messages');
                    loadMoreMessages.parentNode.insertBefore(newMessageElement, loadMoreMessages);
                } else {
                    document.querySelector('.messages').prepend(newMessageElement);
                }
                newMessageElement.addEventListener('animationend', function() {
                    newMessageElement.classList.remove('fade-in');
                });
                if(document.getElementById('noentries'))
                    document.getElementById('noentries').remove();
                applyFancytime();
                addTooltips('time.message-date');

                if(document.body.classList.contains('speechbox-popup')) {
                    scrollToBottom();
                }
            }

            function createMessageElement(messageJson, messageFormatted) {
                const senderName = document.createElement('strong');
                senderName.className = 'message-sender';
                senderName.innerHTML = parseBadwords(escapeHtml(messageJson.name));

                const container = document.createElement('div');
                container.classList.add('message-container', 'fade-in');
                container.appendChild(senderName);

                if (messageJson.email) {
                    const emailLink = document.createElement('a');
                    emailLink.href = `mailto:${messageJson.email}`;
                    emailLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>`;
                    container.appendChild(emailLink);
                    container.appendChild(document.createTextNode(' '));
                }

                if (messageJson.website) {
                    const websiteLink = document.createElement('a');
                    const websiteHref = messageJson.website.startsWith('http') ? messageJson.website : 'http://' + messageJson.website;
                    websiteLink.href = websiteHref;
                    websiteLink.target = '_parent';
                    websiteLink.rel = 'nofollow';
                    websiteLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="m575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1v16.1c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1-1.4.1-2.8.1-4.2.1h-32.5-24c-22.1 0-40-17.9-40-40v-24-64c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40h-24-31.9c-1.5 0-3-.1-4.5-.2-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40v-112c0-.9 0-1.9.1-2.8v-69.6h-32.1c-18 0-32-14-32-32.1 0-9 3-17 10-24l256.4-223.5c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24z"/></svg>`;
                    container.appendChild(websiteLink);
                    container.appendChild(document.createTextNode(' '));
                }

                if(authenticated && isAdmin) {
                    const deleteLink = document.createElement('a');
                    deleteLink.classList.add('delete-message');
                    deleteLink.dataset.messageId = messageJson.id;
                    deleteLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;
                    container.appendChild(deleteLink);
                    deleteLink.addEventListener('click', () => deleteMessage(messageJson.id));
                }

                const timeElement = document.createElement('time');
                timeElement.className = 'message-date';
                timeElement.setAttribute('datetime', messageJson.post_utc_date);
                container.appendChild(timeElement);

                const messageP = document.createElement('p');
                messageP.className = 'msg';
                messageP.id = `m${messageJson.id}`;
                messageP.innerHTML = messageFormatted;
                container.appendChild(messageP);

                                    const emojiListToggle = document.createElement('a');
                    emojiListToggle.className = 'emoji-list-toggle';
                    emojiListToggle.innerHTML = '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zm-464 0a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9h212.5c14.2 0 25.5 12.4 21.3 25.9-16.8 54.5-67.6 94.1-127.6 94.1s-110.8-39.6-127.5-94.1zm13.7-121.9a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>';
                    container.appendChild(emojiListToggle);

                    const emojiList = document.createElement('div');
                    emojiList.className = 'emoji-list';
                    allowedEmoji.forEach(emoji => {
                        const emojiEl = document.createElement('a');
                        emojiEl.className = 'emoji';
                        emojiEl.dataset.emoji = emoji;
                        emojiEl.innerHTML = emoji;
                        emojiList.appendChild(emojiEl);
                        emojiEl.addEventListener('click', function() {
                            toggleReaction(emoji, messageJson.id);
                            emojiListToggle.classList.remove('visible');
                            emojiList.classList.remove('visible');
                        });
                    });
                    container.appendChild(emojiList);

                    emojiListToggle.addEventListener('click', function() {
                        emojiListToggle.classList.toggle('visible');
                        emojiList.classList.toggle('visible');
                    });
                
                let totalReactions = 0;
                if(messageJson.reactions) {
                    totalReactions = Object.values(messageJson.reactions).reduce((sum, count) => sum + count, 0);
                }
                if(totalReactions > 0) {
                    const reactionsContainer = document.createElement('div');
                    reactionsContainer.className = 'reactions';
                    Object.entries(messageJson.reactions).forEach(([emoji, count]) => {
                        const reactionEl = document.createElement('a');
                        reactionEl.className = 'reaction';
                        reactionEl.dataset.emoji = emoji;
                        if(messageJson.user_reactions && messageJson.user_reactions.includes(emoji)) {
                            reactionEl.classList.add('user-reacted');
                        }
                        reactionEl.innerHTML = `<span class="emoji">${emoji}</span> <span class="reaction-count">${count}</span>`;
                        reactionsContainer.appendChild(reactionEl);
                    });
                    container.appendChild(reactionsContainer);
                }

                return container;
            }

            function deleteMessage(messageId) {
                log('🗑️ Going to try and delete message ' + messageId);
                let messageContainer = document.getElementById('m' + messageId).closest('.message-container');
                // TODO: add a no-pointer class or a spinner to indicate that the message is being deleted
                fetch('/box/' + box_id + '/delete-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sb_auth: authToken,
                        message_id: messageId
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    messageContainer.classList.add('fade-out');
                    messageContainer.addEventListener('animationend', function() {
                        messageContainer.remove();
                    });
                });
            }

            function showMessageNotification(name, message) {
                if (Notification.permission === "granted" && !document.hasFocus()) {
                    const preprocessedMessage = message.replace(
                        /([^\s])?\s*!\[([^\]]*)\]\([^)]+\)\s*([^\s])?/g,
                        function(match, beforeChar, altText, afterChar) {
                            let replacement = lang.desktop_notifications_image_placeholder;
                            if (beforeChar) {
                                replacement = beforeChar + " " + replacement;
                            } else if (match.startsWith(" ")) {
                                replacement = " " + replacement;
                            }
                            if (afterChar) {
                                replacement = replacement + " " + afterChar;
                            } else if (match.endsWith(" ")) {
                                replacement = replacement + " ";
                            }
                            return replacement;
                        }
                    );
                    const safeMessage = formatMessage(preprocessedMessage).replace(/<\/?[^>]+(>|$)/g, ""); // processing normally, but removing html afterwards
                    const shortMessage = safeMessage.substring(0, 30) + (safeMessage.length > 30 ? "..." : "");
                    log('🔔 Showing desktop notification: ' + shortMessage);
                    const notificationTitle = lang.desktop_notifications_from + ' ' + name;
                    const notification = new Notification(notificationTitle, {
                        body: shortMessage,
                        icon: 'https://www.speechbox.chat/favicon.png'
                    });
                    notification.onclick = function() {
                        window.focus();
                        document.getElementById('message').focus();
                        this.close();
                    };
                }
            }

            // Used to find out actual message character length without all the allowed specialties
            function filterMessageContent(content, customEmoji) {
                let filtered = content.replace(/!\[.*?\]\(.*?\)/g, '');
                filtered = filtered.replace(/\n\[.*?\]\(.*?\)/g, '');
                filtered = filtered.replace(/\bhttps?:\/\/\S+\b/g, '');
                filtered = filtered.replace(/\[.*?\]\(.*?\)/g, '');
                filtered = filtered.replace(/[*~_`-]/g, '');
                let length = Array.from(filtered).length;
                if(typeof customEmoji !== "undefined" && customEmoji) {
                    customEmoji.forEach(function(customEmojiTag) {
                        var escapedCustomEmojiTag = customEmojiTag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                        var customEmojiTagCount = (content.match(new RegExp(escapedCustomEmojiTag, 'g')) || []).length;
                        length -= customEmojiTag.length * customEmojiTagCount - customEmojiTagCount;
                    });
                }
                return {
                    filtered: filtered,
                    length: length
                };
            }

            function counter() {
                let textFieldContent = document.querySelector('textarea').value;
                if(textFieldContent.length !== 0) {
                    document.getElementById('frmsubmit').classList.add('highlighted');
                } else {
                    document.getElementById('frmsubmit').classList.remove('highlighted');
                }

                let result = filterMessageContent(textFieldContent, customEmoji);
                let length = result.length;

                let counter = document.getElementById('counter');
                let remainingChars = maxChars - length;
                let percentageLeft = remainingChars / maxChars * 100;
                counter.textContent = remainingChars;
                counter.classList.remove('counter-sub0');
                document.querySelector('form.post').removeAttribute('onsubmit');
                counter.style.opacity = 0;
                counter.style.fontWeight = 'normal';
                if(percentageLeft <= 50)
                    counter.style.opacity = .5;
                if(percentageLeft <= 20)
                    counter.style.opacity = 1;
                if(percentageLeft <= 10)
                    counter.style.fontWeight = 'bold';
                if(remainingChars < 0) {
                    counter.classList.add('counter-sub0');
                    document.querySelector('form.post').setAttribute('onsubmit', 'return false;');
                }
            }

            function hideSettings() {
                var el = document.getElementById('settings');
                if (el.classList.contains('show')) {
                    el.classList.remove('show');
                }
            }

            function hideImageDialog() {
                let imageDialog = document.getElementById('imageDialog');
                imageDialog.classList.remove('visible');
            }

            function applyFancytime() {
                if (updateFancyTimer) {
                    clearTimeout(updateFancyTimer);
                }
                document.querySelectorAll('.message-container .message-date').forEach(function(dateEl) {
                    let fancyTime;
                    let utcDateString = dateEl.getAttribute('datetime');
                    let msgDate = new Date(utcDateString + 'Z');
                    let diff = Math.abs(new Date() - msgDate) / 1000;

                    let titleAttribute = new Intl.DateTimeFormat(userLocale, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: userLocale === 'en-US'
                    }).format(msgDate);

                    if(!dateEl.dataset.tooltip) {
                        dateEl.setAttribute('title', titleAttribute);
                    }

                    const baseLocale = userLocale.split('-')[0].toLowerCase();
                    const units = {
                        'en': { minute: 'm', hour: 'h', day: 'd' },
                        'de': { minute: ' Min.', hour: ' Std.', day: ' T' },
                        'fr': { minute: ' min', hour: ' h', day: 'j' },
                        'es': { minute: ' min.', hour: ' h', day: ' d' },
                        'pt': { minute: 'min', hour: 'h', day: 'd' },
                        'nl': { minute: 'm', hour: 'u', day: 'd' },
                        'pl': { minute: ' min.', hour: ' godz.', day: ' d.' },
                        'it': { minute: 'm', hour: 'h', day: 'g' }
                    };
                    const format = units[baseLocale] || units['en'];
                    if (diff < 60) {
                        fancyTime = lang.date_now;
                    }
                    else if (diff < 3600) {
                        const minutes = Math.round(diff / 60);
                        fancyTime = minutes + format.minute;
                    }
                    else if (diff < 86400) {
                        const hours = Math.round(diff / 3600);
                        fancyTime = hours + format.hour;
                    }
                    else if (diff < 2678400) { // 31 days in seconds
                        const days = Math.round(diff / 86400);
                        fancyTime = days + format.day;
                    }
                    else {
                        const msgDate = new Date(new Date() - diff * 1000);
                        const today = new Date();
                        const options = { month: 'short', day: 'numeric' };
                        if (msgDate.getFullYear() !== today.getFullYear()) {
                            options.year = 'numeric';
                        }
                        fancyTime = new Intl.DateTimeFormat(userLocale, options).format(msgDate);
                    }

                    dateEl.textContent = fancyTime;
                });
                updateFancyTimer = setTimeout(() => {
                    applyFancytime();
                }, 30000);
            }

            function insertTag(startTag, endTag) {
                var textarea = document.getElementById('message');
                var text = textarea.value;
                var start = textarea.selectionStart;
                var end = textarea.selectionEnd;

                if (text.length === 0) { // if textarea is empty
                    textarea.value = startTag + endTag;
                    // put cursor where startTag ends
                    setCaretPosition(textarea, startTag.length, startTag.length);
                } else if (start !== end) { // if some text is selected
                    textarea.value = text.substring(0, start) + startTag + text.substring(start, end) + endTag + text.substring(end);
                    // put cursor at the end of selection before endTag
                    setCaretPosition(textarea, (start + startTag.length + (end - start)), (start + startTag.length + (end - start)));
                } else { // if textarea contains text but nothing is selected
                    textarea.value = textarea.value.substring(0, start) + startTag + endTag + textarea.value.substring(start);
                    // put startTag where the cursor currently is, then cursor, then endTag
                    setCaretPosition(textarea, (start + startTag.length), (start + startTag.length));
                }
            }

            function imageDialog() {
                const imageDialog = document.getElementById('imageDialog');
                imageDialog.classList.toggle('visible');
            }

            function isTouchOnlyDevice() {
                // 'coarse' indicates touch input, 'fine' indicates mouse/stylus
                return window.matchMedia('(pointer: coarse) and (hover: none)').matches;
            }

            function setCaretPosition(ctrl, start, end) {
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(start, end);
                }
            }

            // Keyboard Shortcuts
            /*
            -- CMD + B or CTRL + B for bold
            -- CMD + I or CTRL + I for italic
            -- CMD + SHIFT + X or CTRL + SHIFT + X for strikethrough
            -- CMD + SHIFT + C or CTRL + SHIFT + C for inline code
            -- Shift + Return/Enter for new line
            -- Return/Enter for send
            */

            function setupKeyboardShortcuts() {
                const hasTouchScreen = navigator.maxTouchPoints > 0;
                const isMobile = /Mobi|Android/i.test(navigator.userAgent);

                if (!isMobile || !hasTouchScreen) {
                    document.addEventListener('keydown', function(event) {
                        // Check if the CMD key is held down (only for Mac or iOS)
                        var isCmd = event.metaKey && (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPHONE') >= 0 || navigator.platform.toUpperCase().indexOf('IPOD') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0);

                        // Check if the CTRL key is held down (for platforms other than Mac or iOS)
                        var isCtrl = event.ctrlKey && !(navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPHONE') >= 0 || navigator.platform.toUpperCase().indexOf('IPOD') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0);

                        // Check if the SHIFT key is held down
                        var isShift = event.shiftKey;

                        // Check if the textarea is focused
                        var isTextareaFocused = document.activeElement.id === 'message';

                        if ((isCmd || isCtrl) && isTextareaFocused && !event.altKey) {
                            if ((event.key === 'b' || event.key === 'B')) {
                                insertTag('**', '**');
                            } else if (event.key === 'i' || event.key === 'I') {
                                insertTag('_', '_');
                            } else if (isShift && (event.key === 'x' || event.key === 'X')) {
                                insertTag('~', '~');
                            } else if (isShift && (event.key === 'c' || event.key === 'C')) {
                                insertTag('`', '`');
                            }
                        }

                        if (event.key === 'Enter' || event.key === 'Return') {
                            var textarea = document.getElementById('message');
                            var captchaForm = document.getElementById('svgCaptchaForm');

                            // Shift + Return/Enter: Create a new line
                            if (event.shiftKey) {
                                event.preventDefault();
                                var cursorPos = textarea.selectionStart;
                                var textBefore = textarea.value.substring(0, cursorPos);
                                var textAfter = textarea.value.substring(cursorPos);
                                textarea.value = textBefore + '\n' + textAfter;
                                textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
                                textarea.parentNode.dataset.replicatedValue = textarea.value;
                            } else {
                                // Return/Enter: Submit the appropriate form
                                event.preventDefault();

                                // If captcha form is present, submit that instead of the message
                                if (captchaForm) {
                                    document.querySelector('#svgCaptchaForm input[type="submit"]').click();
                                } else {
                                    // No captcha - handle normal message submission
                                    if (!document.getElementById('imageDialog').classList.contains('visible')) {
                                        document.getElementById('frmsubmit').click();
                                        // textarea.parentNode.dataset.replicatedValue = textarea.value = '';
                                    } else {
                                        // Image dialog open, check Url
                                        checkImageUrl();
                                    }
                                }
                            }
                        }
                    });
                }
            }

            setupKeyboardShortcuts();

            function formatMessage(message) {
                message = escapeHtml(message);
                if (boxdataSettings.badword) {
                    message = parseBadwords(message);
                }
                if (boxdataSettings.smilies && customEmojiJSON) {
                    message = parseCustomEmoji(message);
                }
                message = parseMarkdown(message);
                message = nl2br(message);
                const emojiClass = getEmojiFormattingClass(message);
                if (emojiClass) {
                    message = `<span class="${emojiClass}">${message}</span>`;
                }
                return message;
            }

            // Escape HTML special characters
            function escapeHtml(text) {
                return text
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            }

            // Convert newlines to <br> tags
            function nl2br(text) {
                return text.replace(/\n/g, '<br>');
            }

            function getEmojiFormattingClass(message) {
                const trimmedMessage = message.trim();
                const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji}(?:\u200D\p{Emoji})+)/gu;
                const matches = [...trimmedMessage.matchAll(emojiRegex)];
                const emojiOnly = matches.map(m => m[0]).join('');
                if (trimmedMessage === emojiOnly) {
                    const emojiCount = matches.length;
                    if (emojiCount === 1) {
                        return 'emoji-single'; // 3x size for just one emoji
                    } else if (emojiCount === 2 || emojiCount === 3) {
                        return 'emoji-few';    // 2x size for 2-3 emojis only
                    }
                }
                return '';
            }

            // Converting URLs to links
            function urlsToLinks(text) {
                var urlPattern = /\b((https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,63}(:\d+)?(\/[^\s]*)?)\b/gi;
                return text.replace(urlPattern, function(match) {
                    var url = match;
                    var urlWithPrefix = match;
                    if (!/^https?:\/\//i.test(url)) {
                    urlWithPrefix = "http://" + url;
                    }
                    return '<a href="' + urlWithPrefix + '" target="_blank">' + url + '</a>';
                });
            }

            // Function to parse only images in markdown
            function parseMarkdownImages(text) {
                // Handle Markdown images and wrap them with <a> tags
                return text.replace(/!\[(.*?)\]\(([^)]+)\)/g, function(match, altText, imagePath) {
                    altText = altText || ''; // Ensure empty alt text is handled
                    altText = escapeHtml(altText);
                    if (!/^https?:\/\//i.test(imagePath)) {
                        imagePath = 'http://' + imagePath.replace(/^\/+/, '');
                    }
                    return '<a href="' + escapeHtml(imagePath) + '" target="_blank">' +
                        '<img src="' + escapeHtml(imagePath) + '" alt="' + altText + '" title="' + altText + '">' +
                        '</a>';
                });
            }

            // Main markdown parser function with text formatting being optional
            function parseMarkdown(text, options = {}) {
                // Default options - all parsing enabled by default except URLs which follow the existing setting
                const defaultOptions = {
                    parseImages: true,     // Always true by default
                    parseMarkup: boxdataSettings.boxcodes,    // Controls all text formatting (bold, italic, strikethrough, inline code)
                    parseUrls: boxdataSettings.url_e_rep // Use existing setting
                };

                // Merge user options with defaults
                options = {...defaultOptions, ...options};

                // Step 1: Always parse images if enabled (which is the default)
                if (options.parseImages) {
                    text = parseMarkdownImages(text);
                }

                // Step 2: Temporarily replace existing <a> or <img> tags with placeholders
                let placeholders = {};
                let counter = 0;
                text = text.replace(/<a[\s\S]*?<\/a>|<img[\s\S]*?>/gi, function(m) {
                    let placeholder = "{URL" + counter + "}";
                    placeholders[placeholder] = m;
                    counter++;
                    return placeholder;
                });

                // Step 3: Extract inline code blocks if markup parsing is enabled
                let codePlaceholders = {};
                let codeCounter = 0;
                if (options.parseMarkup) {
                    text = text.replace(/`([^`]+)`/g, function(match, codeContent) {
                        let placeholder = "{CODE" + codeCounter + "}";
                        codePlaceholders[placeholder] = '<code>' + escapeHtml(codeContent) + '</code>';
                        codeCounter++;
                        return placeholder;
                    });
                }

                // Step 4: Replace regular URLs with links if enabled
                if (options.parseUrls) {
                    text = urlsToLinks(text);
                }

                // Step 5: Escape backslash-escaped markdown characters (for _, ~, `)
                let escapedCharacters = {};
                let escCounter = 0;
                text = text.replace(/\\([_~`])/g, function(match, p1) {
                    let placeholder = "{ESC" + escCounter + "}";
                    escapedCharacters[placeholder] = p1;
                    escCounter++;
                    return placeholder;
                });

                // Step 6: Define markdown replacement rules if markup parsing is enabled
                let markdownRules = [];

                if (options.parseMarkup) {
                    // Add all text formatting rules when markup parsing is enabled
                    markdownRules.push({ regex: /(\*\*|__)([\s\S]+?)\1/g, replacement: '<strong>$2</strong>' });
                    markdownRules.push({ regex: /(_|\*)([\s\S]+?)\1/g, replacement: '<em>$2</em>' });
                    markdownRules.push({ regex: /(~)([\s\S]+?)\1/g, replacement: '<del>$2</del>' });
                }

                // Step 7: Apply markdown replacement rules
                markdownRules.forEach(function(rule) {
                    text = text.replace(rule.regex, rule.replacement);
                });

                // Step 8: Restore escaped markdown characters
                Object.keys(escapedCharacters).forEach(function(placeholder) {
                    text = text.replace(new RegExp(placeholder, 'g'), escapedCharacters[placeholder]);
                });

                // Step 9: Restore inline code placeholders
                Object.keys(codePlaceholders).forEach(function(placeholder) {
                    text = text.replace(new RegExp(placeholder, 'g'), codePlaceholders[placeholder]);
                });

                // Step 10: Replace placeholders with original <a> and <img> tags
                Object.keys(placeholders).forEach(function(placeholder) {
                    text = text.replace(new RegExp(placeholder, 'g'), placeholders[placeholder]);
                });

                return text;
            }

            /* Replacing custom emoji */
            function parseCustomEmoji(text) {
                if (!customEmojiJSON || !Array.isArray(customEmojiJSON)) return text;
                customEmojiJSON.forEach(emoji => {
                    if (emoji.textrep && emoji.imageurl) {
                        let imageUrl = emoji.imageurl.startsWith("http") ? emoji.imageurl : "https://" + emoji.imageurl;
                        let regex = new RegExp(emoji.textrep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                        text = text.replace(regex, `<img src="${imageUrl}" alt="${emoji.textrep}" class="custom-emoji">`);
                    }
                });
                return text;
            }

            function parseBadwords(text) {
                if (!text || !boxdataSettings?.badword) return text;
                const badwords = boxdataSettings.badword
                    .split(/[,\s]+/)
                    .filter(word => word.length >= 2);

                const patterns = badwords.map(word =>
                    new RegExp(word, 'gi')
                );

                return patterns.reduce((processed, pattern) => {
                    return processed.replace(pattern, match => {
                        const firstChar = match[0];
                        const stars = '&#42;'.repeat(match.length - 1);
                        return firstChar + stars;
                    });
                }, text);
            }

            function placeAds() {
                const adContainers = document.querySelectorAll('.speechbox-ads');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            loadAd(entry.target, box_id);
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1
                });

                adContainers.forEach(adContainer => observer.observe(adContainer));
            }

            function loadAd(adContainer, boxId) {
                fetch('/box/' + boxId + '?action=getad')
                    .then(response => response.json())
                    .then(ad => {
                        adContainer.innerHTML = '';

                        const adWrapper = document.createElement('div');
                        adWrapper.style.position = 'relative';
                        adWrapper.style.width = '100%'; // Set width as needed
                        adWrapper.style.height = '266px'; // Set height as needed
                        adWrapper.style.overflow = 'hidden';

                        const adIframe = document.createElement('iframe');
                        adIframe.src = ad.content_url;
                        adIframe.width = "100%";
                        adIframe.height = "100%";
                        adIframe.style.border = "none";
                        adIframe.style.overflow = "hidden";

                        const overlay = document.createElement('a');
                        overlay.href = ad.click_url;
                        overlay.target = "_blank";
                        overlay.style.position = 'absolute';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100%';
                        overlay.style.height = '100%';
                        overlay.style.backgroundColor = 'transparent';
                        overlay.style.overflow = 'hidden';
                        overlay.innerHTML = '&#8203;';
                        overlay.style.cursor = 'pointer';

                        adWrapper.appendChild(adIframe);
                        adWrapper.appendChild(overlay);
                        adContainer.appendChild(adWrapper);

                    })
                    .catch(error => console.error('Error fetching ad:', error));
            }

            // Image insert via URL
            const imageUrlInput = document.getElementById('insertImageUrl');
            const removeImageButton = document.querySelector('.remove-image');

            document.addEventListener('DOMContentLoaded', function() {
                imageUrlInput.addEventListener('input', debounce(checkImageUrl, 500));
                imageUrlInput.addEventListener('paste', function(e) {
                    setTimeout(checkImageUrl, 100);
                });

                removeImageButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    resetImagePreview();
                    let imageId = this.dataset.imageId;
                    if (imageId !== 'external' && !isNaN(imageId)) {
                        fetch('/box/' + box_id + '/remove?image_id=' + imageId, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    }
                    document.getElementById('message').setAttribute('required', 'required');
                    document.getElementById('message').focus();
                });
            });

            function debounce(func, wait) {
                let timeout;
                return function() {
                    const context = this;
                    const args = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                    func.apply(context, args);
                    }, wait);
                };
            }

            function checkImageUrl() {
                const url = imageUrlInput.value.trim();

                if (!isValidUrl(url)) {
                    return;
                }

                checkIfImageExists(url, function(isImage) {
                    imageLoadingSpinner('stop');
                    if (isImage) {
                        const previewContainer = document.querySelector('.image-uploaded-container');
                        previewContainer.style.backgroundImage = 'url(' + url + ')';
                        setOptimalBackgroundSize(url, previewContainer);
                        previewContainer.querySelector('button').dataset.imageId = 'external';
                        previewContainer.classList.add('visible');
                        hideImageDialog();
                        let messageInput = document.getElementById('message');
                        messageInput.removeAttribute('required');
                        messageInput.focus();
                    } else {
                        let errorEl = document.querySelector('.insert-image-error');
                        errorEl.textContent = lang.insert_image_invalid;
                        errorEl.classList.add('visible');
                        // console.log(lang.insert_image_invalid);
                    }
                });
            }

            function isValidUrl(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }

            function checkIfImageExists(url, callback) {
                imageLoadingSpinner('start');
                const img = new Image();
                img.onload = function() {
                    callback(true);
                };
                img.onerror = function() {
                    callback(false);
                };
                img.src = url + '?random=' + new Date().getTime();
            }

            function imageLoadingSpinner(status) {
                if(status == 'start') {
                    document.querySelector('.insert-image-error').classList.remove('visible');
                    document.querySelector('.image-insert-options').classList.add('disabled');
                    document.getElementById('insertImageUrl').setAttribute('disabled', 'disabled');
                    document.querySelector('.image-loading-spinner').classList.add('visible');
                } else {
                    document.querySelector('.image-insert-options').classList.remove('disabled');
                    document.getElementById('insertImageUrl').removeAttribute('disabled');
                    document.querySelector('.image-loading-spinner').classList.remove('visible');
                }
            }

                            /* IMAGE UPLOAD */
                const imageModal = document.getElementById('imageDialog');
                const imageDescInput = document.getElementById('insertImageAltText');

                const dropArea = document.getElementById('image-drop-area');
                const fileInput = document.getElementById('file-input');
                const messageContainer = document.querySelector('main');

                let isDragging = false;
                let isOverDropArea = false;

                document.addEventListener('DOMContentLoaded', function() {
                    dropArea.addEventListener('click', function(e) {
                        if (e.target.tagName.toLowerCase() !== 'label') {
                            fileInput.click();
                        }
                    });

                    document.addEventListener('dragover', function(e) {
                        e.preventDefault();
                        if (!isDragging) {
                            isDragging = true;
                            imageDialog();
                        }
                    });

                    document.addEventListener('dragleave', function(e) {
                        if (e.clientX <= 0 || e.clientY <= 0 ||
                            e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                            isDragging = false;
                            isOverDropArea = false;
                            if (dropArea) {
                                dropArea.classList.remove('highlight');
                            }
                        }
                    });

                    document.addEventListener('drop', function(e) {
                        e.preventDefault();
                        isDragging = false;
                        isOverDropArea = false;
                        if (dropArea) {
                            dropArea.classList.remove('highlight');
                        }
                        hideImageDialog();
                    });

                    imageModal.addEventListener('dragover', function(e) {
                        e.preventDefault();
                        isDragging = true;
                        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
                        if (elementBelow === dropArea || dropArea.contains(elementBelow)) {
                            if (!isOverDropArea) {
                                isOverDropArea = true;
                                dropArea.classList.add('highlight');
                            }
                            } else {
                            if (isOverDropArea) {
                                isOverDropArea = false;
                                dropArea.classList.remove('highlight');
                            }
                        }
                    });

                    imageModal.addEventListener('dragleave', function(e) {
                        e.preventDefault();
                    });

                    if (dropArea) {
                        dropArea.addEventListener('drop', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.classList.remove('highlight');
                            isDragging = false;
                            isOverDropArea = false;

                            const files = e.dataTransfer.files;
                            if (files && files.length) {
                                handleFiles(files);
                            } else {
                                hideImageDialog();
                            }
                        });
                    }

                    if (fileInput) {
                        fileInput.addEventListener('change', function() {
                            handleFiles(this.files);
                        });
                    }

                    messageContainer.addEventListener('dragenter', function(e) {
                        e.preventDefault();
                        if (!imageModal || imageModal.style.display !== 'block') {
                            imageDialog();
                        }
                    });

                    document.addEventListener('paste', function(e) {
                        const items = e.clipboardData.items;
                        if(items) {
                            for(let i = 0; i < items.length; i++) {
                                if(items[i].type.indexOf('image') !== -1) {
                                    const blob = items[i].getAsFile();
                                    const mimeType = blob.type;
                                    const extension = mimeType.split('/')[1];
                                    const filename = `pasted-image.${extension}`;
                                    const file = new File([blob], filename, { type: mimeType });
                                    const files = {
                                        0: file,
                                        length: 1,
                                        item: function(index) { return this[index]; }
                                    };
                                    imageDialog();
                                    handleFiles(files);
                                    break;
                                }
                            }
                        }
                    });
                });

                function handleFiles(files) {
                    if (!files || !files.length) return;

                    const file = files[0]; // Just handle the first file
                    if (!file.type.match('image.*')) {
                        displayUploadError(lang.upload_error_filetype);
                        return;
                    }

                    // Check file size (e.g., 5MB max)
                    const imageUploadMaxSize = 10485760;
                    const friendlyMaxSize = Math.round(imageUploadMaxSize / (1024 * 1024)) + ' MB';
                    if (file.size > imageUploadMaxSize) {
                        displayUploadError(lang.upload_error_filesize.replace('{size}', friendlyMaxSize));
                        return;
                    }

                    // Show initial upload status
                    const progressFill = dropArea.querySelector('.upload-progress-fill');
                    const percentageText = dropArea.querySelector('.upload-percentage');

                    if (dropArea) {
                        dropArea.querySelectorAll('.drop-default').forEach(el => el.style.display = 'none');
                        dropArea.querySelectorAll('.drop-progress').forEach(el => el.style.display = '');
                        if (progressFill) {
                            progressFill.style.width = '0%';
                        }

                        if (percentageText) {
                            percentageText.textContent = '0%';
                        }
                    }

                    // Create FormData and append file
                    const formData = new FormData();
                    formData.append('image', file);

                    // Use XMLHttpRequest for progress tracking
                    const xhr = new XMLHttpRequest();

                    // Track upload progress
                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            document.getElementById('file-input').setAttribute('disabled', 'disabled');
                            document.getElementById('insertImageUrl').setAttribute('disabled', 'disabled');
                            const percentComplete = Math.round((e.loaded / e.total) * 100);

                            // Update the progress bar and text
                            if (dropArea) {
                                if(percentComplete === 100) {
                                    dropArea.querySelectorAll('.drop-progress-text').forEach(el => el.style.display = 'none');
                                    dropArea.querySelectorAll('.drop-processing').forEach(el => el.style.display = '');
                                } else {
                                    dropArea.querySelectorAll('.drop-default').forEach(el => el.style.display = 'none');
                                    dropArea.querySelectorAll('.drop-progress').forEach(el => el.style.display = '');
                                    dropArea.querySelectorAll('.drop-progress-text').forEach(el => el.style.display = '');
                                }

                                // Update progress bar
                                if (progressFill) {
                                    progressFill.style.width = percentComplete + '%';
                                }

                                if (percentageText) {
                                    percentageText.textContent = percentComplete + '%';
                                }
                            }
                        }
                    });

                    // Handle completion
                    xhr.addEventListener('load', function() {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                const response = JSON.parse(xhr.responseText);
                                if (response.success) {
                                    if (dropArea) {
                                        dropArea.querySelectorAll('.drop-progress').forEach(el => el.style.display = 'none');
                                        dropArea.querySelectorAll('.drop-success').forEach(el => el.style.display = '');
                                        dropArea.querySelectorAll('.drop-error').forEach(el => el.style.display = 'none');

                                        const previewContainer = document.querySelector('.image-uploaded-container');
                                        previewContainer.style.backgroundImage = 'url(' + response.url + ')';
                                        setOptimalBackgroundSize(response.url, previewContainer);
                                        previewContainer.querySelector('button').dataset.imageId = response.image_id;
                                        document.getElementById('image-description').value = response.original_name;
                                        document.getElementById('file-input').removeAttribute('disabled');
                                        document.getElementById('insertImageUrl').removeAttribute('disabled');
                                        previewContainer.classList.add('visible');
                                        resetDropArea();
                                        hideImageDialog();
                                    }
                                    const imageUrlInput = document.getElementById('insertImageUrl');
                                    if (imageUrlInput) {
                                        imageUrlInput.value = 'https://www.speechbox.chat/uploads/' + response.filename;
                                    }
                                    const imageDescInput = document.getElementById('insertImageAltText');
                                    if (imageDescInput) {
                                        const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
                                        imageDescInput.value = fileName;
                                    }
                                    const messageInput = document.getElementById('message');
                                    messageInput.removeAttribute('required');
                                    messageInput.focus();
                                } else {
                                    let errorMessage = lang[response.error_message].replace('{size}', friendlyMaxSize);
                                    // API returned error
                                    if (dropArea) {
                                        displayUploadError(errorMessage);
                                    }
                                }
                            } catch (e) {
                                console.log(e);
                                // JSON parse error
                                if (dropArea) {
                                    displayUploadError(lang.upload_error);
                                }
                            }
                        } else {
                            // HTTP error
                            if (dropArea) {
                                displayUploadError(lang.upload_error);
                            }
                        }
                    });

                    // Handle network errors
                    xhr.addEventListener('error', function() {
                        if (dropArea) {
                            displayUploadError(lang.upload_error);
                        }
                    });

                    // Handle aborted uploads
                    xhr.addEventListener('abort', function() {
                        if (dropArea) {
                            displayUploadError(lang.upload_error);
                        }
                    });

                    xhr.open('POST', '/box/' + box_id + '/upload', true);
                    xhr.send(formData);
                }

                // Function to reset the drop area to its initial state
                function resetDropArea() {
                    if (!dropArea) return;

                    // Find the elements that need to be shown in the default state
                    const defaultElements = dropArea.querySelectorAll('.drop-default');
                    const progressElements = dropArea.querySelectorAll('.drop-progress');
                    const processingElements = dropArea.querySelectorAll('.drop-processing');
                    const successElements = dropArea.querySelectorAll('.drop-success');
                    const errorElements = dropArea.querySelectorAll('.drop-error');

                    // Show default elements, hide others
                    defaultElements.forEach(el => el.style.display = '');
                    progressElements.forEach(el => el.style.display = 'none');
                    processingElements.forEach(el => el.style.display = 'none');
                    successElements.forEach(el => el.style.display = 'none');
                    errorElements.forEach(el => el.style.display = 'none');

                    // Reset any progress bars
                    const progressBar = dropArea.querySelector('.upload-progress-fill');
                    if (progressBar) {
                        progressBar.style.width = '0%';
                    }

                    // Remove any added classes
                    dropArea.classList.remove('highlight');
                }
            
            function displayUploadError(message) {
                if (dropArea) {
                    document.getElementById('upload-error-message').textContent = message;
                    dropArea.querySelectorAll('.drop-progress').forEach(el => el.style.display = 'none');
                    dropArea.querySelectorAll('.drop-error').forEach(el => el.style.display = '');
                }
            }

            function resetImagePreview() {
                document.getElementById('insertImageUrl').value = '';
                const previewContainer = document.querySelector('.image-uploaded-container');
                previewContainer.style.backgroundImage = '';
                previewContainer.classList.remove('visible');
                imageUrlInput.value = '';
                document.getElementById('image-description').value = '';
            }

            function setOptimalBackgroundSize(imageUrl, containerElement) {
                const img = new Image();
                img.onload = function() {
                    const imgWidth = img.naturalWidth;
                    const imgHeight = img.naturalHeight;
                    const containerWidth = containerElement.offsetWidth;
                    const containerHeight = containerElement.offsetHeight;
                    const isSmaller = imgWidth <= containerWidth && imgHeight <= containerHeight;
                    containerElement.style.backgroundImage = `url(${imageUrl})`;
                    containerElement.style.backgroundSize = isSmaller ? 'auto' : 'contain';
                };
                img.src = imageUrl;
            }

