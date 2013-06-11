Ext.define('MyApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to PHP\'s GAE Kitchen Sink'
                },

                html: [
                    "This is a Kitchen Sink of the basic functions of the Google App Engine using PHP."
                ].join("")
            },
            {
                xtype: 'nestedlist',
                title: 'Get Started',
                iconCls: 'action',
                displayField: 'title',

                store: {
                    type: 'tree',

                    fields: [
                        'title', 'link', 'author', 'contentSnippet', 'content', 'slug',
                        {name: 'leaf', defaultValue: true}
                    ],

                    root: {
                        leaf: false
                    },

                    proxy: {
                        type: 'ajax',
                        url:'/services/views/gaephp.json',
                        reader: {
                            type: 'json',
                            rootProperty: 'responseData.feed.entries'
                        }
                    }
                },
                detailCard: {
                    xtype: 'panel',
                    scrollable: true,
                    styleHtmlContent: true
                },

                listeners: {
                    itemtap: function(nestedList, list, index, element, post) {
                        var itemSlug = post.get('slug');
                        if(itemSlug == "signin"){
                            var testItems = [
                                {
                                    xtype:'fieldset',
                                    title: 'PHP Sign In using +Google',
                                    instructions: 'Place credentials here',
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            name : 'uname',
                                            label: 'Username'
                                        },
                                        {
                                            xtype: 'passwordfield',
                                            name : 'pword',
                                            label: 'Password'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Send',
                                            ui: 'confirm',
                                            handler: function() {
                                                this.up('formpanel').submit();
                                            }
                                        }
                                    ]
                                }
                            ]
                            var formPanel = Ext.create('Ext.form.Panel',{
                                xtype:'formpanel',
                                fullscreen:true ,
                                scrollable:true ,
                                layout:'vbox',
                                url:'services/controllers/main_controller.php?action=signin',
                                items:testItems
                            });
                            this.setDetailCard(formPanel);
                            console.log("HERE --");
                        } else {
                            this.getDetailCard().setHtml(post.get('content'));
                        }

                    }
                }
            }
        ]
    }
});
