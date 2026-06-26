import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const prerender = true;

export const GET: APIRoute = async () => {
  const fontRegular = readFileSync(resolve('node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf')).buffer;
  const fontSemiBold = readFileSync(resolve('node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.ttf')).buffer;

  const profilePath = resolve('public/images/avatar.png');
  const profileBase64 = readFileSync(profilePath).toString('base64');
  const profileSrc = `data:image/png;base64,${profileBase64}`;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f8f6',
          backgroundImage:
            'radial-gradient(circle, #E5E5E5 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          fontFamily: '"Geist Mono", monospace',
          padding: '80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '64px',
                width: '100%',
              },
              children: [
                // Profile photo
                {
                  type: 'img',
                  props: {
                    src: profileSrc,
                    width: 200,
                    height: 200,
                    style: {
                      borderRadius: '24px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    },
                  },
                },
                // Text content
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    },
                    children: [
                      // Name
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '72px',
                            fontWeight: 600,
                            color: '#343844',
                            lineHeight: 1,
                            letterSpacing: '-1px',
                          },
                          children: 'Eric Ruelas',
                        },
                      },
                      // Title
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '32px',
                            fontWeight: 400,
                            color: '#3d4c74',
                            lineHeight: 1.2,
                          },
                          children: 'Senior Product Designer',
                        },
                      },
                      // Location + URL row
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            marginTop: '8px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '20px',
                                  color: '#7a7f87',
                                },
                                children: 'San Francisco Bay Area',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '20px', color: '#dadce0' },
                                children: '·',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '20px',
                                  color: '#7a7f87',
                                },
                                children: 'ericruelas.com',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist Mono', data: fontRegular, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: fontSemiBold, weight: 600, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
